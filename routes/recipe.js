const express = require('express');
const router = express.Router();
const { auth } = require('../middleware');
const { recipeList, searchRecipe } = require('../controller/main');
const { uploadFunc } = require('../controller/writeRecipe');
const { myRecipeList, myRecipeSearch } = require('../controller/myRecipe');
const recipe = require('../controller/recipe');
const { verify } = require('../controller/verify');

router.post('/recipelist', recipeList); //hyun
router.post('/writerecipe', auth, uploadFunc);
router.get('/data/:id', auth, recipe.getRecipePage);
router.post('/writerecipe', uploadFunc);
router.post('/verify', auth, verify);
router.post('/myrecipe', auth, myRecipeList); //hyun
router.post('/mysearch', auth, myRecipeSearch); //hyun
router.post('/search', searchRecipe); //hyun

module.exports = router;
