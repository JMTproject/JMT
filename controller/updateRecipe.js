const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { Recipe, Ingredient, CookingTools, CookingStep } = require('../models');

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
  { name: 'mainImage' },
  { name: 'files1' },
  { name: 'files2' },
  { name: 'files3' },
  { name: 'files4' },
  { name: 'files5' },
]);

const updateFunc = async (req, res) => {
  arrayFiles(req, res, async (err) => {
    console.log('req.body', req.body);
    console.log('req.files', req.files);

    if (err) {
      return res.status(500).json({ result: false, message: '업로드 오류' });
    }
    try {
      const { userId } = req.userInfo;
      if (!userId) {
        res.json({ result: false, message: '로그인 오류' });
        return;
      }
      const { title, introduceRp, servings, cookingTime } = req.body;
      const { amounts, stepContents, ingredients, cookingTools, recipeId } = req.body;
      const { mainImage, files1, files2, files3, files4, files5 } = req.files;
      const filesArray = [files1, files2, files3, files4, files5];
      console.log(1);

      const parsedIngredients = ingredients.split(',');
      const parsedAmounts = amounts.split(',');
      const parsedTools = cookingTools.split(',');
      const parsedStepContents = stepContents.split(',');
      console.log(parsedIngredients);
      console.log(parsedAmounts);
      console.log(parsedTools);
      console.log(parsedStepContents);

      const find = await Recipe.findOne({ where: { recipeId } });
      console.log(1);
      if (!find) {
        return res.status(404).json({ result: false, message: 'recipeId없음' });
      }
      console.log(1);
      const Default = await Recipe.findOne({ where: { recipeId } });
      //https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1723536345806-%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-06-10%20205000.png
      //https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1723535944311-%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202024-05-30%20010345.png

      const data =
        mainImage != undefined
          ? {
              recipeTitle: title,
              description: introduceRp,
              mainImg: mainImage[0].location,
              servings,
              cookingTime,
            }
          : {
              recipeTitle: title,
              description: introduceRp,
              servings,
              cookingTime,
            };

      await Recipe.update(data, { where: { recipeId } });
      console.log('=============');
      await Ingredient.destroy({ where: { recipeId } });
      for (let i = 0; i < parsedIngredients.length; i++) {
        await Ingredient.create({
          ingredientName: parsedIngredients[i],
          quantity: parsedAmounts[i],
          recipeId,
        });
      }
      console.log(2);
      await CookingTools.destroy({ where: { recipeId } });
      for (let i = 0; i < parsedTools.length; i++) {
        await CookingTools.create({
          toolName: parsedTools[i],
          recipeId,
        });
      }
      console.log(3);

      for (let i = 0; i < parsedStepContents.length; i++) {
        let CookingStepData =
          filesArray[i] != undefined
            ? {
                step: i + 1,
                content: parsedStepContents[i],
                stepImg: filesArray[i][0].location,
              }
            : {
                step: i + 1,
                content: parsedStepContents[i],
              };

        await CookingStep.update(CookingStepData, { where: { recipeId, step: [i + 1] } });
      }
      console.log(4);
      res.json({ result: true });
    } catch (error) {
      res.status(500).json({ result: false });
    }
  });
};

module.exports = { updateFunc };
