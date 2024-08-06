require('dotenv').config();
const express = require('express');
const { signupFunc, loginFunc, infoFunc, deleteFunc, updateFunc, NNcheckFunc, sendMail } = require('../controller/user');
const { auth } = require('../middleware');
const router = express.Router();

// router.get('/idcheck', idCheckFunc); //세용
router.post('/mail', sendMail);
router.get('/findNN', NNcheckFunc); //세용
router.post('/signup', signupFunc); //세용
router.post('/login', loginFunc); //세용
router.get('/info', auth, infoFunc); //세용
router.patch('/update', auth, updateFunc); //세용
router.patch('/delete', auth, deleteFunc); //세용

module.exports = router;
