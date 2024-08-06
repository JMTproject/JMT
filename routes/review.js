const express = require('express');
const router = express.Router();
const review = require('../controller/review');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// 모든 리뷰 가져오기
router.get('/', review.getAllReviews);

// 새로운 리뷰 추가
router.post('/', upload.single('reviewImg'), review.addReview);

module.exports = router;
