// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware');
const { submitReview } = require('../controller/review');

// 리뷰 제출하기
router.post('/recipe/data/:id/reviews', auth, submitReview);

module.exports = router;
