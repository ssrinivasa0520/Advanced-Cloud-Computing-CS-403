const fs = require('fs');
const AWS = require('aws-sdk');

const ID = process.env.AWS_ACCESS_KEY;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    region: 'us-east-2',
    signatureVersion: 'v4'
});

const uploadFile = (filePath, originalFileName, metadata, cb) => {
    // Read content from the file
    const fileContent = fs.readFileSync(filePath);

    // Setting up S3 upload parameters
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: originalFileName,
        Body: fileContent,
        Metadata: metadata
    };

    // Uploading files to the bucket
    s3.upload(params, cb);
};

const generatePresignedLink = (filename) => {
    return s3.getSignedUrl('getObject', {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: filename,
        Expires: 10800
    })
}

module.exports = {
    uploadFile,
    generatePresignedLink
}