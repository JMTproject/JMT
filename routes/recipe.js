const express = require('express');
const router = express.Router();
const { auth } = require('../middleware');
const { recipeList, searchRecipe } = require('../controller/main');
const { uploadFunc } = require('../controller/writeRecipe');
const { myRecipeList, myRecipeSearch } = require('../controller/myRecipe');
const recipe = require('../controller/recipe');
const { verify } = require('../controller/verify');
const { viewCount } = require('../controller/viewCount');
const { generateRecipe } = require('../controller/geminiAI');
const { openRecipe } = require('../controller/openRecipe');
const { updateFunc } = require('../controller/updateRecipe');

router.post('/recipelist', recipeList); //hyun
router.post('/writerecipe', auth, uploadFunc);
router.get('/data/:id', recipe.getRecipePage);
router.post('/writerecipe', uploadFunc);
router.post('/updaterecipe', auth, updateFunc);

router.get('/updaterecipe/:id', auth, openRecipe);
router.post('/verify', auth, verify);
router.post('/myrecipe', auth, myRecipeList); //hyun
router.post('/mysearch', auth, myRecipeSearch); //hyun
router.post('/search', searchRecipe); //hyun
router.get('/viewCount/:id', viewCount); //hyun
router.post('/generateRecipe', generateRecipe); //hyun

module.exports = router;
