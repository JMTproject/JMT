const { where } = require('sequelize');
const { User, Recipe, Review, Ingredient, CookingTools, CookingStep } = require('../models');
const openRecipe = async (req, res) => {
  const recipeId = req.params.id;
  const recipe = await Recipe.findOne({ where: { recipeId } });
  // console.log('reci@@@@@@@:', recipe);

  const ingredient = await Ingredient.findAll({ where: { recipeId } });
  // console.log('ingre@@@@@', ingredient);

  const cookingtools = await CookingTools.findAll({ where: { recipeId } });
  // console.log('tools@@@', cookingtools);

  const cookingstep = await CookingStep.findAll({ where: { recipeId } });
  // console.log('steps@@@', cookingstep);

  res.json({ recipe, ingredient, cookingtools, cookingstep });
};

module.exports = { openRecipe };
