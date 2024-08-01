require('dotenv').config();
const express = require('express');
const db = require('./models');
const app = express();
const PORT = 8000;
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

app.set('view engine', 'ejs');
console.log(process.env.BUCKET);

app.use('/public', express.static(__dirname + '/public'));

app.use('/public', express.static(__dirname + '/public'));

//aws 설정
aws.config.update({
  accessKeyId: process.env.ACCESSKEY,
  secretAccessKey: process.env.SECRETKEY,
  // region: 'ap-northeast-2',
});

//s3설정
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.origianlname);
    },
  }),
});

//라우터
const pageRouter = require('./routes/page');
app.use('/', pageRouter);
const userRouter = require('./routes/user');
app.use('/api/user', userRouter);
const recipeRouter = require('./routes/recipe');
app.use('/api/recipe', recipeRouter);
const adminRouter = require('./routes/admin');
app.use('/api/admin', adminRouter);
//writerecipe(정영훈)
const writerecipeRouter = require('./routes/writeRecipe');
// const multer = require('multer');
app.use('/api/writerecipe', writerecipeRouter);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
