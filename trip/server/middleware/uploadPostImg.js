const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
})

const uploadPostImg = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'my-trip-project',
        key: function (요청, file, cb) {
            const ext = file.originalname.split('.').pop();
            cb(null, `posts/${Date.now()}.${ext}`);
        }
    })
})

module.exports = uploadPostImg;