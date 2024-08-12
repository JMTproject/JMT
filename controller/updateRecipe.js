const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { User, Recipe, Ingredient, CookingTools, CookingStep } = require('../models');

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

const updateFunc = async (req, res) => {
  const step = [1, 2, 3, 4, 5];

  arrayFiles(req, res, async (err) => {
    console.log('req.body:', req.body);
    console.log('req.files:', req.files);
    if (err) {
      return res.status(500).json({ result: false, message: '업로드 오류' });
    }
    console.log(1);
    try {
      const { userId } = req.userInfo;
      if (!userId) {
        res.json({ result: false, message: '로그인 오류' });
        return;
      }
      console.log(2);
      const { stepImages, mainImage, title, introduceRp, servings, cookingTime } = req.body;
      const { amounts, stepContents, ingredients, cookingTools, recipeId } = req.body;
      const filesArray = [];


      for (let i = 0; i < stepImages.length; i++) {
        filesArray.push(stepImages[i]);
      }
      console.log('@#!##!#', filesArray);
      console.log(3);
      const find = await Recipe.findOne({ where: { recipeId } });
      if (!find) {
        return res.status(404).json({ result: false, message: 'recipeId없음' });
      }

      await Recipe.update(
        {
          recipeTitle: title,
          description: introduceRp,
          mainImage: mainImage,
          servings,
          cookingTime,
        },
        { where: { recipeId } }
      );
      await Ingredient.destroy({ where: { recipeId } });
      for (let i = 0; i < ingredients.length; i++) {
        await Ingredient.create({
          ingredientNum: i + 1,
          ingredientName: ingredients[i],
          quantity: amounts[i],
          recipeId,
        });
      }

      await CookingTools.destroy({ where: { recipeId } });
      for (let i = 0; i < cookingTools.length; i++) {
        await CookingTools.create({
          toolNum : i+1,
          toolName : cookingTools[i],
          recipeId,
        });
      }

      for (let i = 0; i < 5; i++) {
        await CookingStep.update(
          {
            step: i + 1,
            content: stepContents[i],
            stepImg: filesArray[i],
          },
          { where: { recipeId, step: [i + 1] } }
        );
      }
      
      res.json({ result: true });
    } catch (error) {
      res.status(500).json({ result: false });
    }
  });
};

module.exports = { updateFunc };
