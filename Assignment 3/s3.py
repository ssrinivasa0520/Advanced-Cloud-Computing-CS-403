import boto3, os

S3_BUCKET_NAME = "ssrinivauab"

s3 = boto3.client("s3")

name = input("Enter your name: ")

first_name, last_name = name.split()

file_name = last_name.lower() + ".txt"

with open(file_name, "w") as f:
    f.write(name.lower())

s3.upload_file(file_name, S3_BUCKET_NAME, file_name)

os.remove(file_name)

s3.download_file(S3_BUCKET_NAME, file_name, file_name)

with open(file_name) as f:
    print(f.read())
