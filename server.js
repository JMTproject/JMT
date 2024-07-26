require('dotenv').config();
const express = require('express');
const db = require('./models');
const app = express();
const PORT = 8000;

app.set('view engine','ejs');
// console.log(process.env.BUCKET);

//라우터
const pageRouter = require('./routes/page')
app.use('/', pageRouter)


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
