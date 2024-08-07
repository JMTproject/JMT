const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { User, Recipe, Review, Ingredient, CookingTools, CookingStep } = require('../models');
const recipe = require('../models/recipe');

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
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      // cb(null, Data.now().toString() + '-' + file.originalname);
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

const arrayFiles = upload.fields([
  { name: 'files1' },
  { name: 'files2' },
  { name: 'files3' },
  { name: 'files4' },
  { name: 'files5' },
  { name: 'files6' },
]);
const uploadFunc = async (req, res) => {
  console.log(req.body);
  arrayFiles(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ result: false, message: '업도르 오류' });
    }
    console.log('req.file!#$#$#', req.files);
    console.log('req.body!#$#$#', req.body);

    try {
      if (!req.userInfo) {
        res.json({ result: false, message: '로그인 오류' });
        return;
      }
      const { userId } = req.userInfo;
      console.log('유저아이디@', userId);

      const { title, introduceRp, servings, cookingTime, ingredients, tools, steps } = req.body;
      console.log('title!!!', title);
      const result = await Recipe.create({ recipeTitle: title, description: introduceRp, mainImg: mainImg });

      const images = [];
      req.files.forEach((value) => {
        images.push({
          url: value.location,
          recipeId: result.recipeId,
        });
      });
      await Recipe.create(); //이미지를 데이터베이스에 저장
      res.json({ result: true });

      console.log(images);
    } catch (error) {
      res.status(500).json({ result: false });
    }
  });
};

const main = (req, res) => {
  res.render('writeRecipe');
};

module.exports = { uploadFunc, main };
