const { User, Review, Ingredient } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupFunc = async (req, res) => {
  try {
    const { email, password, nickName } = req.body;
    const find = await User.findOne({ where: { email } });
    // console.log(find);
    if (find) {
      res.json({ result: false, message: '이미 존재하는 계정' });
    } else {
      const pass = await bcrypt.hash(password, 10);
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
    const { email, password, check } = req.body;
    const find = await User.findOne({ where: { email } });
    if (find) {
      const pass = await bcrypt.compare(password, find.password);
      if (!find.isEnabled) {
        return res.json({ result: false, code: 201, message: '탈퇴한 계정입니다.' });
      }
      if (pass) {

        const {  userId, email } = find.dataValues;

        const token = jwt.sign({ userId, email }, process.env.SECRET, { expiresIn: '10h' });

        const response = { token };
        res.json({ result: true, check, email, response, message: '토큰 로그인 성공' });
      } else {
        res.json({ result: false, code: 202, response: null, message: '비밀번호가 일치하지 않습니다.' });
      }
    } else {
      res.json({ result: false, code: 200, response: null, message: '존재하지 않는 아이디' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, response: null, message: '서버오류' });
  }
};

const infoFunc = async (req, res) => {
  try {
    const { email } = req.userInfo;
    const find = await User.findOne({ where: { email } });
    console.log(find, '들어옴');

    const { nickName, profileImg, aboutMe } = find;
    const response = {
      email,
      nickName,
      profileImg,
      aboutMe,
    };
    res.json({ result: true, response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, message: '서버오류' });
  }
};

const updateFunc = async (req, res) => {
  try {
    const { email } = req.userInfo;
    const { password, nickName, profileImg, aboutMe } = req.body;
    const pass = await bcrypt.hash(password, 10);
    const find = await User.findOne({ where: { email } });
    if (find) {
      await User.update({ password: pass, nickName, profileImg, aboutMe }, { where: { email } });
    }
    res.json({ result: true, message: '프로필 수정 성공' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, message: '서버오류' });
  }
};

const deleteFunc = async (req, res) => {
  try {
    const { email } = req.userInfo;
    const { isEnabled } = req.body;
    const find = await User.findOne({ where: { email } });
    if (find) {
      await User.update({ isEnabled }, { where: { email } });
    }
    res.json({ reslut: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, message: '서버오류' });
  }
};

module.exports = { signupFunc, loginFunc, infoFunc, updateFunc, deleteFunc };
