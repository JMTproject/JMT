// const aws = require('aws-sdk');
const multer = require('multer');
// const multerS3 = require('multer-s3');
const { Recipe, CookingStep, CookingTools, Ingredient, Review, User } = require('../models');

// //aws 설정
// aws.config.update({
//     accessKeyId: process.env.ACCESSKEY,
//     secretAccessKey: process.env.SECRETKEY,
//     region: 'ap-northeast-2',
// });

// //aws s3 인스턴스 생성
// const s3 = new aws.S3();

// //multer 설정
// const upload = multer({
//     storage: multerS3({
//         s3, //s3: s3
//         bucket: process.env.BUCKET,
//         acl: 'public-read', //파일접근권한 (public-read로 해야 업로드 된 파일이 공개)
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString() + '-' + file.originalname);
//         },
//     }),
// });

// const arrayFiles = upload.array('files');

// exports.uploadFunc = async (req, res) => {
//     arrayFiles(req, res, async (err) => {
//         if (err) {
//             return res.status(500).json({ result: false });
//         }

//         try {
//             const { title, content } = req.body;
//             const post = await Post.create({ title, content });

//             // const images = req.files.map((value) => ({
//             //     url: value.location,
//             //     postId: post.id,
//             // }));
//             const images = [];
//             req.files.forEach((value) => {
//                 images.push({
//                     url: value.location,
//                     postId: post.id,
//                 });
//             });

//             await Image.bulkCreate(images);

//             res.json({ result: true });
//         } catch (error) {
//             res.status(500).json({ result: false });
//         }
//     });
// };

exports.submitReview = async (req, res) => {
    const recipeId = req.params.recipeId;
    const { rating, content } = req.body;
    const reviewImg = req.file ? req.file.filename : null;

    try {
        if (!rating || !content) {
            throw new Error('rating과 content는 필수 입력 사항입니다.');
        }

        await Review.create({
            recipeId: recipeId,
            rating: parseFloat(rating),
            content: content,
            reviewImg: reviewImg,
        });
        res.send('리뷰가 성공적으로 제출되었습니다.');
    } catch (error) {
        console.error('리뷰 제출 에러:', error);
        res.status(500).send('서버 오류');
    }
};
