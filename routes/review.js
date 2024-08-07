// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { submitReview, uploadFunc } = require('../controller/review');

// 리뷰 제출하기
router.post('/recipe/data/:id/reviews', upload.single('reviewImg'), submitReview);
// router.post('/review', uploadFunc);

module.exports = router;
