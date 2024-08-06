const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { User, Recipe, Review, Ingredient, CookingTools, CookingStep } = require('../models');

//aws 설정
aws.config.update({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETKEY,
  region: 'ap-northeast-2',
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
      // cb(null, Data.now().toString() + '-' + file.originalname);
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

const arrayFiles = upload.array('files');
const uploadFunc = async (req, res) => {
  arrayFiles(req, res, async (err) => {
    console.log('req.body!#$#$#', req.body);
    console.log('req.files@#$#@', req.files);

    try {
      const { title, introduceRp, servings, cookingTime, ingredients, tools, steps } = req.body;
      console.log('title!!!', title);
      const result = await Recipe.create({ recipeTitle: title, description: introduceRp, mainImg: content });

      const images = [];
      req.files.forEach((value) => {
        images.push({
          url: value.location,
          postId: post.id,
        });
      });
      if (err) {
        return res.status(500).json({ result: false });
      }
    } catch (error) {
      res.status(500).json({ result: false });
    }
  });
};

module.exports = { uploadFunc };
