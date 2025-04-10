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

const uploadUser = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'my-trip-project',
        key: function (req, file, cb) {
            const userName = req.body.name;
            const extension = file.originalname.split('.').pop();
            cb(null, `users/${userName}-${extension}`);
        }
    })
})


module.exports = uploadUser;