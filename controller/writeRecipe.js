const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
// const { Post, Image } = require('../public/images');

//aws 설정
aws.config.update({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETKEY,
  // region: 'ap-northeast-2',
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldName });
    },
    key: function (req, file, cb) {
      cb(null, Data.now().toString() + '-' + file.originalname);
    },
  }),
});

const arrayFiles = upload.array('files');
const uploadFunc = async (req, res) => {
  arrayFiles(req, res, async (err) => {
    console.log(req.body);
    console.log(req.files);
    if (err) {
      return res.status(500).json({ result: false });
    }
    try {
      const { title, content } = req.body;
      const post = await Post.create({ title, content });

      const images = [];
      req.files.forEach((value) => {
        images.push({
          url: value.location,
          postId: post.id,
        });
      });
    } catch (error) {
      res.status(500).json({ result: false });
    }
  });
};

const main = (req, res) => {
  res.render('writeRecipe');
};
module.exports = { uploadFunc, main };
