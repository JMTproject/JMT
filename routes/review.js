// routes/recipeRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { auth } = require('../middleware');
const { submitReview, updateReview, deleteReview } = require('../controller/review');

// 리뷰 제출
router.post('/recipe/data/:id/reviews', auth, submitReview);

// 리뷰 수정
router.put('/recipe/data/:id/update', auth, updateReview);

// 리뷰 삭제
router.put('/recipe/data/:id/delete', auth, deleteReview);

module.exports = router;
