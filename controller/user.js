const { User, Review, Ingredient } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const idCheckFunc = async (req, res) =>{
  try {
    const {email} = req.body;
    const find = await User.findOne({where : {email}})
    if(find){
      res.json({result : false, message : "이미 존재하는 ID입니다."})
    } else {
      res.json({result : true, message : "사용가능한 ID입니다."})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, message: '서버오류' });
  }
}

//NN = NickName
const NNCheckFunc = async (req, res) =>{
  try {
    const {nickName} = req.body;
    const find = await User.findOne({where : {nickName}})
    if(find){
      res.json({result : false, message : "이미 존재하는 닉네임입니다."})
    } else {
      res.json({result : true, message : "사용가능한 닉네임입니다."})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, message: '서버오류' });
  }
}

const signupFunc = async (req, res) => {
  try {
    const { email, password, nickName } = req.body;
    const find = await User.findOne({ where: { email } });
    // console.log(find);
    if (find) {
      res.json({ result: false, message: '이미 존재하는 계정' });
    } else {
      const pass = await bcrypt.hash(password, 10);
      console.log(email, pass, nickName);
      const result = await User.create({ email, password: pass, nickName });
      console.log(result);
      res.json({ result: true, message: '아이디 생성완료' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, message: '서버오류' });
  }
};

const loginFunc = async (req, res) => {
  try {
    const { email, password } = req.body;
    const find = await User.findOne({ where: { email } });
    if (find) {
      const pass = await bcrypt.compare(password, find.password);
      if (pass) {
        // console.log("=-===============", find.dataValues);
        const { email, nickName, profileImg, aboutMe } = find.dataValues;
        const token = jwt.sign({ email, nickName, profileImg, aboutMe }, process.env.SECRET, { expiresIn: '1h' });
        // console.log(token);
        const response = { token };
        res.json({ result: true, response, message: '로그인 성공' });
      } else {
        res.json({ result: false, response: null, message: '비밀번호가 일치하지 않습니다.' });
      }
    } else {
      res.json({ result: false, response: null, message: '존재하지 않는 아이디' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, message: '서버오류' });
  }
};

const infoFunc = async (req, res) => {};

module.exports = {idCheckFunc, NNCheckFunc ,signupFunc, loginFunc, infoFunc };
