const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { Recipe, CookingStep, CookingTools, Ingredient, Review, User } = require('../models');
const { CloudSearch } = require('aws-sdk');

//aws 설정
aws.config.update({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETKEY,
  region: 'ap-northeast-2',
});

//aws s3 인스턴스 생성
const s3 = new aws.S3();

//multer 설정
const upload = multer({
  storage: multerS3({
    s3, //s3: s3
    bucket: process.env.BUCKET,
    acl: 'public-read', //파일접근권한 (public-read로 해야 업로드 된 파일이 공개)
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

const arrayFiles = upload.array('files');

exports.submitReview = async (req, res) => {
  arrayFiles(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ result: false });
    }

    const recipeId = req.params.id;
    const { rating, content } = req.body;
    const reviewImg = req.files[0] ? req.files[0].location : '';
    const { userId } = req.userInfo;

    try {
      if (!rating || !content) {
        throw new Error('rating과 content는 필수 입력 사항입니다.');
      }

      const review = await Review.create({
        recipeId: recipeId,
        userId,
        rating: rating,
        content: content,
        reviewImg: reviewImg,
      });

    //   리뷰 평점 구하고 레시피 테이블에 넣기 ------------------- hyun
    const reviewRatings = await Review.findAll({
        where: { recipeId },
        attributes: ['rating']
      });
      console.log('모든 리뷰 레이팅', reviewRatings);
      
      const averageRating = reviewRatings.reduce((acc, rating) => acc + parseFloat(rating.dataValues.rating), 0) / reviewRatings.length;
      console.log('평균 점수', averageRating);

      const updateResult = await Recipe.update({rating: averageRating}, {where: {recipeId}})
      console.log('결과!@!@',updateResult);
      
    //   ------------------------------------ hyun

      res.json({
        review: {
          ...review.toJSON(),
          user: {
            nickName: userId.nickName,
            profileImg: userId.profileImg,
          },
        },
      });
    } catch (error) {
      console.error('리뷰 제출 에러:', error);
      res.status(500).send('서버 오류');
    }
  });
};
