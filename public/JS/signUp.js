function signUpFunc() {
  const pwd1 = document.getElementById('pwd1').value;
  const pwd2 = document.getElementById('pwd2').value;

  if (pwd1 !== pwd2) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  const data = {
    email: document.getElementById('email').value,
    password: pwd1,
    nickName: document.getElementById('nickname').value,
  };

  axios({
    method: 'post',
    url: '/api/user/signup',
    data,
  }).then((res) => {
    if (res.data.result) {
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      document.location.href = '/login';
    }
  });
}
