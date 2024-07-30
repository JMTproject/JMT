const express = require('express');
const { main, login, signup, profile, recipe, writeRecipe, updateRecipe } = require('../controller/index');
const router = express.Router();

router.get('/', main);
router.get('/login', login);
router.get('/signup', signup);
router.get('/profile', profile);
router.get('/recipe', recipe);
router.get('/writeRecipe', writeRecipe);
router.get('/updateRecipe', updateRecipe);

module.exports = router;
