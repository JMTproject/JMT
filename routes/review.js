const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// 모든 리뷰 가져오기
router.get('/', reviewController.getAllReviews);

// 새로운 리뷰 추가
router.post('/', upload.single('reviewImg'), reviewController.addReview);

module.exports = router;
