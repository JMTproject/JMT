const express = require('express');
const router = express.Router();
const { adminUL, deleteRecipe, deleteUser, recipeList } = require('../controller/admin');
const { auth } = require('../middleware');

router.post('/recipelist', auth, recipeList);
router.patch('/deleterecipe', auth, deleteRecipe);
router.post('/userlist', auth, adminUL);
router.patch('/deleteuser', auth, deleteUser);

module.exports = router;
