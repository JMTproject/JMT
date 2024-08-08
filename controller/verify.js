const verify = (req, res) => {
  try {
    if (!req.userInfo) {
      res.json({ result: false, message: '로그인 오류' });
      return;
    }
    res.json({ result: true, message: '로그인 권한존재' });
  } catch (error) {
    res.status(500).json({ result: false });
  }
};

module.exports = { verify };
