const express = require('express');
const router = express.Router();

// const Recipe = require('../models/Recipe');

const { recipeList } = require('../controller/main');
const { uploadFunc } = require('../controller/writeRecipe');

router.post('/recipelist', recipeList); //hyun
router.post('/writerecipe', uploadFunc);

// router.get('/recipe/:id', async (req, res) => {
//     try {
//         const recipe = await Recipe.findByPk(req.params.id);
//         res.json(recipe);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

module.exports = router;
