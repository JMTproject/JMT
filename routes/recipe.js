const express = require('express');
const router = express.Router();

const { recipeList } = require('../controller/main');
const { uploadFunc } = require('../controller/writeRecipe');

router.post('/recipelist', recipeList) //hyun
router.post('/writerecipe', uploadFunc)



module.exports = router;

