require('dotenv').config();
const express = require('express');
const { signupFunc, loginFunc, infoFunc, idCheckFunc, NNCheckFunc } = require('../controller/user');
const { auth } = require('../middleware');
const router = express.Router();

router.get('/idcheck', idCheckFunc); //세용
router.get('/nickname', NNCheckFunc); //세용
router.post('/signup', signupFunc); //세용
router.post('/login', loginFunc); //세용
router.get('/info', auth, infoFunc); //세용

module.exports = router;
