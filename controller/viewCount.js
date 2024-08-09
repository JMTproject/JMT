const { User, Recipe, Review, Ingredient, CookingTools, CookingStep } = require('../models');

const viewCount = async (req, res) => {
  const recipeId = req.params.id;  

  const findRecipe = await Recipe.findOne({ where: { recipeId } });
  let viewCount = findRecipe.dataValues.viewCount;

    viewCount++;
    console.log('뷰카운트 증가', viewCount);

    const result = await Recipe.update({ viewCount }, { where: { recipeId } });
    console.log('조회수결과', result);
 
};

module.exports = { viewCount };
