async function emailCheckFunc() {
  const email = document.querySelector('#email');
  const authCode = document.querySelector('#authCode');
  const emailBtn = document.querySelector('#emailFuncBtn');
  const authBtn = document.querySelector('#authCheckBtn');
  const emailP = document.querySelector('#emailResult');
  const authP = document.querySelector('#authResult');
  const data = { email: email.value };

  try {
    const res = await axios({
      method: 'post',
      url: '/api/user/mail',
      data
    });

    if (res.data.result) {
      console.log(res.data.code);
      email.disabled = true;
      emailP.textContent = '인증번호를 입력해주세요.';
      emailP.style.color = 'green';
      emailBtn.textContent = '재전송';
      authCode.hidden = false;
      authBtn.hidden = false;
      
      authCode.dataset.code = res.data.code;
    } else {
      emailP.textContent = '유효한 이메일을 입력해주세요.';
      emailP.style.color = 'red';
    }
  } catch (error) {
    console.error('요청 중 오류가 발생했습니다:', error);
    emailP.textContent = '인증 요청 중 오류가 발생했습니다.';
    emailP.style.color = 'red';
  }
}

document.querySelector('#authCheckBtn').addEventListener('click', function() {
  const authCode = document.querySelector('#authCode');
  const authP = document.querySelector('#authResult');
  const inputCode = authCode.value;
  const savedCode = authCode.dataset.code;

  authCheckFunc(savedCode, inputCode, authP);
});

async function authCheckFunc(authcode, inputcode, authP) {
  if (String(authcode) === String(inputcode)) {
    authP.textContent = '인증이 완료되었습니다.';
    authP.style.color = 'green';
  } else {
    authP.textContent = '인증번호를 확인해주세요';
    authP.style.color = 'red';
  }
}

function PwdCheck() {
  const pwd1 = document.querySelector('#pwd1').value;
  const pwd2 = document.querySelector('#pwd2').value;
  const checkPwd = document.querySelector('#checkPwd');
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/;
  if (passwordRegex.test(pwd1)) {
    if (pwd1 === pwd2) {
      checkPwd.textContent = '비밀번호가 일치합니다.';
      checkPwd.style.color = 'green';
    } else {
      checkPwd.textContent = '비밀번호가 일치하지 않습니다.';
      checkPwd.style.color = 'red';
    }
  } else {
    checkPwd.textContent = '비밀번호는 최소 8자에서 16자까지, 영문자, 숫자 및 특수 문자를 포함해야 합니다.';
    checkPwd.style.color = 'red';
  }
}

function NNcheckFunc() {
  const data = {
    nickName: document.querySelector('#nickname').value,
  };
  const checkNN = document.querySelector('#checkNN');
  console.log(data);
  console.log(checkNN);
  axios({
    method: 'get',
    url: '/api/user/findNN',
    params: data,
  }).then((res) => {
    if (res.data.result) {
      checkNN.textContent = '사용 가능한 닉네임입니다.';
      checkNN.style.color = 'green';
    } else {
      checkNN.textContent = '이미 존재하는 닉네임입니다.';
      checkNN.style.color = 'red';
    }
  });
}

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
