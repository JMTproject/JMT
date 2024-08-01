const express = require('express')
const router = express.Router();
const { recipeList } = require('../controller/main')

router.post('/recipelist', recipeList) //hyun



module.exports = router;