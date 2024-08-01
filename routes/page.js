const express = require('express');
const {main, login, signup, profile, recipe, writeRecipe, myRecipe, updateRecipe, adminRp, adminUL} = require('../controller/page')
const router = express.Router();

router.get('/', main);
router.get('/login',login);
router.get('/signup',signup);
router.get('/profile',profile);
router.get('/recipe',recipe);
router.get('/writeRecipe',writeRecipe);
router.get('/updateRecipe', updateRecipe);
router.get('/myRecipe',myRecipe);
router.get('/adminRp', adminRp);
router.get('/adminUL', adminUL);

module.exports = router;
