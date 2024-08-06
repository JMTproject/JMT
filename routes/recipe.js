const express = require('express');
const router = express.Router();

// const Recipe = require('../models/Recipe');

const { recipeList, searchRecipe } = require('../controller/main');
const { uploadFunc } = require('../controller/writeRecipe');
const { myRecipeList, myRecipeSearch } = require('../controller/myRecipe');
const { auth } = require('../middleware');

router.post('/recipelist', recipeList); //hyun
router.post('/writerecipe', uploadFunc);
router.post('/myrecipe', auth, myRecipeList); //hyun
router.post('/mysearch', auth, myRecipeSearch); //hyun
router.post('/search', searchRecipe); //hyun

// router.get('/recipe/:id', async (req, res) => {
//     try {
//         const recipe = await Recipe.findByPk(req.params.id);
//         res.json(recipe);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

module.exports = router;
