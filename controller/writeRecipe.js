const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { User, Recipe, Review, Ingredient, CookingTools, CookingStep } = require('../models');
const recipe = require('../models/recipe');
const { Json } = require('sequelize/lib/utils');

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
  // console.log('@@@@@', req.body);
  arrayFiles(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ result: false, message: '업도르 오류' });
    }

    try {
      if (!req.userInfo) {
        res.json({ result: false, message: '로그인 오류' });
        return;
      }
      const { userId } = req.userInfo;
      const { files1, files2, files3, files4, files5, files6 } = req.files;

      const filesArray = [files2, files3, files4, files5, files6];
      // console.log('파일즈2', files2[0].location);
      const { title, introduceRp, servings, cookingTime, ingredientNames, ingredientAmounts, tools, stepContents } =
        req.body;

      // console.log('title!!!!', title);
      // console.log('introduceRp!!!!', introduceRp);
      // console.log('servings!!!!', servings);
      // console.log('cookingTime!!!!', cookingTime);
      // console.log('ingredientNames!!!!', ingredientNames);
      // console.log('ingredientAmounts!!!!', ingredientAmounts);
      // console.log('stepContents!!!!', stepContents);
      // console.log('stepsImg!!!!', stepsImg);
      // console.log('img', stepImg);
      console.log('파싱전 스텝', stepContents);
      //JSON 문자열을 배열로 파싱
      const parsedIngredients = JSON.parse(ingredientNames);
      const parsedAmounts = JSON.parse(ingredientAmounts);
      const parsedTools = JSON.parse(tools);
      const parsedStepContents = JSON.parse(stepContents);
      // const parsedStepsImg = JSON.parse(stepImg);
      // console.log('1', parsedIngredients);
      // console.log('2', parsedAmounts);
      // console.log('3', parsedTools);
      // console.log('4', parsedSteps);
      // console.log('5', parsedStepsImg);
      // introduceRp, files1[0].location, servings, cookingTime, userId

      const recipe = await Recipe.create({
        recipeTitle: title,
        description: introduceRp,
        mainImg: files1[0].location,
        servings,
        cookingTime,
        userId,
      });

      let ingredientData = [];
      for (i = 0; i < parsedIngredients.length; i++) {
        ingredientData.push({
          ingredientName: parsedIngredients[i],
          quantity: parsedAmounts[i],
          recipeId: recipe.dataValues.recipeId,
        });
      }
      console.log('재료데이터:', ingredientData);
      let cookingToolData = [];
      for (i = 0; i < parsedTools.length; i++) {
        cookingToolData.push({
          toolName: parsedTools[i],
          recipeId: recipe.dataValues.recipeId,
        });
      }

      let cookingStepData = [];
      for (i = 0; i < parsedStepContents.length; i++) {
        cookingStepData.push({
          step: i + 1,
          content: parsedStepContents[i],
          stepImg: filesArray[i] != undefined ? filesArray[i][0].location : '',
          recipeId: recipe.dataValues.recipeId,
        });
      }
      console.log('data', cookingStepData);
      // let cookingStepData = [];
      // console.log('뭐징', parsedStepsImg);
      // for (i = 0; i < parsedSteps.length; i++) {
      //   cookingStepData.push({
      //     step: [i + 1],
      //     content: parsedSteps[i],
      //         stepImg: parsedStepsImg[i],
      //     recipeId: recipe.dataValues.recipeId,
      //   });
      // }

      await CookingTools.bulkCreate(cookingToolData);

      await Ingredient.bulkCreate(ingredientData);

      await CookingStep.bulkCreate(cookingStepData);

      res.json({ result: true });
    } catch (error) {
      res.status(500).json({ result: false });
    }
  });
};

const main = (req, res) => {
  res.render('writeRecipe');
};

module.exports = { uploadFunc, main };
