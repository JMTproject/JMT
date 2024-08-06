const { User, Recipe, Review, Ingredient, CookingTools, CookingStep } = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const myRecipeList = async (req, res) => {
  try {
    // 권한 확인
    if (!req.userInfo) {
      res.json({ result: false, message: '로그인 오류' });
      return;
    }

    const { userId } = req.userInfo;
    console.log('유저아이디@', userId);

    const myRecipe = await Recipe.findAll({
      where: { userId, isEnabled: true },
      order: [
        ['createdAt', 'DESC'], // createdAt을 기준으로 내림차순 정렬
      ],
    });

    console.log('마이레시피', myRecipe);

    // 리뷰수 만드는 함수
    await Promise.all(
      myRecipe.map(async (recipe) => {
        const reviews = await Review.findAll({ where: { recipeId: recipe.recipeId } });
        recipe.dataValues.reviewCount = `${reviews.length}`;
        recipe._previousDataValues.reviewCount = `${reviews.length}`;
      })
    );

    res.json({ result: true, myRecipe });
  } catch (error) {
    res.status(500).json({ result: false });
  }
};

const myRecipeSearch = async (req, res) => {
  try {
    // 권한 확인
    if (!req.userInfo) {
      res.json({ result: false, message: '로그인 오류' });
      return;
    }

    const { userId } = req.userInfo;
    const keyword = req.body.keyword;
    console.log('유저아이디@', userId);
    console.log('키워드@', keyword);

    const myRecipe = await Recipe.findAll({
      where: {
        userId,
        isEnabled: true,
        recipeTitle: {
          [Op.like]: '%' + keyword + '%',
        },
      },
      order: [
        ['createdAt', 'DESC'], // createdAt을 기준으로 내림차순 정렬
      ],
    });


    // 리뷰수 만드는 함수
    await Promise.all(
      myRecipe.map(async (recipe) => {
        const reviews = await Review.findAll({ where: { recipeId: recipe.recipeId } });
        recipe.dataValues.reviewCount = `${reviews.length}`;
        recipe._previousDataValues.reviewCount = `${reviews.length}`;
      })
    );

    res.json({ result: true, myRecipe });
  } catch (error) {
    res.status(500).json({ result: false });
  }
};

module.exports = { myRecipeList, myRecipeSearch };
