const express = require('express');
const router = express.Router();

const { recipeList } = require('../controller/main');
const { uploadFunc } = require('../controller/writeRecipe');
const recipe = require('../controller/recipe');

router.post('/recipelist', recipeList); //hyun
router.post('/writerecipe', uploadFunc);
router.get('/data/:id', recipe.getRecipePage);

module.exports = router;
