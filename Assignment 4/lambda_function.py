import boto3
import os
import sys
import uuid
from urllib.parse import unquote_plus

s3_client = boto3.client('s3', aws_access_key_id=os.environ['SSRINIVA_LAMBDA_ACCESS_KEY'], aws_secret_access_key=os.environ['SSRINIVA_LAMBDA_SECRET_ACCESS_KEY'])

def change_file_contents_to_all_caps(file_path, modified_file_path):
    with open(file_path) as file:
        contents = file.read()
        with open(modified_file_path, "w") as modified_file:
            modified_file.write(contents.upper())

def lambda_handler(event, context):
    print('Begin modifying .txt file')
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = unquote_plus(record['s3']['object']['key'])
        print(bucket)
        print(key)
        tmpkey = key.replace('/', '')
        download_path = '/tmp/{}-{}'.format(uuid.uuid4(), tmpkey)
        upload_path = '/tmp/modified-{}'.format(tmpkey)
        s3_client.download_file(bucket, key, download_path)
        change_file_contents_to_all_caps(download_path, upload_path)
        s3_client.upload_file(upload_path, os.environ['DESTINATION_BUCKET'], key)
    print('Modifying .txt file complete')
