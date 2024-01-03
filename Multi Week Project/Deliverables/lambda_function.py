#I/ ____SHREYAS SRINIVASA_____ declare that I have completed this computer code in accordance with the UAB Academic Integrity Code and the UAB CS Honor Code.  I have read the UAB Academic Integrity Code and understand that any breach of the Code may result in severe penalties.	
#Student signature(s)/initials: ____SS________	
#Date: __07/29/2023__________

import json
import os
import boto3
import botocore
from urllib.parse import unquote_plus

region = "us-east-2"

s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.environ["SSRINIVA_LAMBDA_ACCESS_KEY"],
    aws_secret_access_key=os.environ["SSRINIVA_LAMBDA_SECRET_ACCESS_KEY"],
    config=botocore.client.Config(signature_version="s3v4"),
    region_name=region,
)

ses_client = boto3.client(
    "ses",
    region_name=region,
    aws_access_key_id=os.environ["SSRINIVA_LAMBDA_ACCESS_KEY"],
    aws_secret_access_key=os.environ["SSRINIVA_LAMBDA_SECRET_ACCESS_KEY"],
)


def lambda_handler(event, context):
    for record in event["Records"]:
        bucket = record["s3"]["bucket"]["name"]
        raw_key = record["s3"]["object"]["key"]
        key = unquote_plus(raw_key)
        print(bucket)
        print(key)

        # location = s3_client.get_bucket_location(Bucket=bucket)['LocationConstraint']
        # url = "https://s3-%s.amazonaws.com/%s/%s" % (location, bucket, raw_key)

        url = s3_client.generate_presigned_url(
            "get_object", Params={"Bucket": bucket, "Key": key}, ExpiresIn=259200
        )

        metadata = s3_client.head_object(Bucket=bucket, Key=key)["Metadata"]
        emails = json.loads(metadata["emails"])

        print(emails)

        if len(emails) > 0:
            print("Begin triggering email")

            subject = "New file uploaded"
            message = (
                "A new file of name %s has been uploaded.\nHere is the link :- %s"
                % (
                    key,
                    url,
                )
            )

            response = ses_client.send_email(
                Destination={"ToAddresses": emails},
                Message={
                    "Body": {
                        "Text": {
                            "Charset": "UTF-8",
                            "Data": message,
                        }
                    },
                    "Subject": {
                        "Charset": "UTF-8",
                        "Data": subject,
                    },
                },
                Source=os.environ["SSRINIVA_SES_EMAIL"],
            )

            print(response)
            print("Triggering email complete")

            return {
                "statusCode": 200,
                "body": json.dumps(
                    "Email Sent Successfully. MessageId is: " + response["MessageId"]
                ),
            }

        return {
            "statusCode": 200,
            "body": "Email list was empty",
        }

