const { User, Recipe, Review, Ingredient, CookingTools, CookingStep } = require('../models');

const viewCount = async (req, res) => {
  const recipeId = req.params.id;  
  const findRecipe = await Recipe.findOne({ where: { recipeId , isEnabled : true} });
  let viewCount = findRecipe.dataValues.viewCount;
    viewCount++;
    const result = await Recipe.update({ viewCount }, { where: { recipeId } });
};

module.exports = { viewCount };
