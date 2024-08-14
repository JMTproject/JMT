const express = require('express');
const router = express.Router();
const { adminUL, deleteRecipe, deleteUser, recipeList } = require('../controller/admin');
const { auth } = require('../middleware');

router.post('/recipelist', auth, recipeList);
router.patch('/deleterecipe', deleteRecipe);
router.post('/userlist', auth, adminUL);
router.patch('/deleteuser', deleteUser);

module.exports = router;
