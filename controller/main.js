const { User, Recipe, Review, Ingredient, CookingTools, CookingStep } = require('../models');


const recipeList = async (req, res) => {
  try {
    const allRecipe = await Recipe.findAll();

    // 리뷰수 만드는 함수
    await Promise.all(
      allRecipe.map(async (recipe) => {
        const reviews = await Review.findAll({ where: { recipeId: recipe.recipeId } });
        recipe.dataValues.reviewCount = `${reviews.length}`;
        recipe._previousDataValues.reviewCount = `${reviews.length}`;
      })
    );

    /*  allRecipe.forEach(async (recipe) => {
      const reviews = await Review.findAll({ where: { recipeId: recipe.recipeId } });
      recipe.reviewCount = reviews.length;
    }); */

    // console.log('콘솔확인!!!@!@', allRecipe[0]);
    res.json({ result: true, allRecipe });
  } catch (error) {
    res.status(500).json({ result: false });
  }
};

module.exports = { recipeList };
