require('dotenv').config();
const express = require('express');
const db = require('./models');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));

//라우터
const pageRouter = require('./routes/page');
app.use('/', pageRouter);
const userRouter = require('./routes/user');
app.use('/api/user', userRouter);
const recipeRouter = require('./routes/recipe');
app.use('/api/recipe', recipeRouter);
const adminRouter = require('./routes/admin');
app.use('/api/admin', adminRouter);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
