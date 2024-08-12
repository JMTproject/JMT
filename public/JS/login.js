document.addEventListener('DOMContentLoaded', function () {
  let loginIdInput = document.getElementById('input_login_id');
  let loginPwdInput = document.getElementById('input_login_pwd');

  let idContainer = loginIdInput.closest('.login_input_container');
  let pwdContainer = loginPwdInput.closest('.login_input_container');

  function checkInputValue(input, container) {
    if (input.value.trim() !== '') {
      container.classList.add('isTyping');
    } else {
      container.classList.remove('isTyping');
    }
  }
  loginIdInput.addEventListener('input', function () {
    checkInputValue(loginIdInput, idContainer);
  });

  loginPwdInput.addEventListener('input', function () {
    checkInputValue(loginPwdInput, pwdContainer);
  });
  checkInputValue(loginIdInput, idContainer);
  checkInputValue(loginPwdInput, pwdContainer);
});

document.addEventListener('DOMContentLoaded', function () {
  let loginIdInput = document.getElementById('input_login_id');
  let loginPwInput = document.getElementById('input_login_pwd');
  let loginButton = document.querySelector('.login_button');

  function updateLoginButtonState() {
    loginButton.disabled = loginIdInput.value.trim() === '' || loginPwInput.value.trim() === '';
  }

  loginIdInput.addEventListener('input', updateLoginButtonState);
  loginPwInput.addEventListener('input', updateLoginButtonState);

  updateLoginButtonState();
});

function loginFunc() {
  const data = {
    email: document.getElementById('input_login_id').value,
    password: document.getElementById('input_login_pwd').value,
    check: document.getElementById('ckeck1').checked,
  };

  axios({
    method: 'post',
    url: '/api/user/login',
    data,
  })
    .then((res) => {
      console.log(res.data.code === 200);
      if (res.data.result) {
        if (res.data.check) {
          alert('로그인 성공! 메인 페이지로 이동합니다');
          localStorage.setItem('token', res.data.response.token);
          if (res.data.email === 'admin@admin.com') {
            document.location.href = '/adminRp';
          } else {
            document.location.href = '/';
          }
        } else if (!res.data.check) {
          alert('로그인 성공! 메인 페이지로 이동합니다');
          sessionStorage.setItem('token', res.data.response.token);
          if (res.data.email === 'admin@admin.com') {
            document.location.href = '/adminRp';
          } else {
            document.location.href = '/';
          }
        }
      } else if (res.data.code === 202) {
        alert('비밀번호가 일치하지않습니다.');
        document.querySelector('#input_login_pwd').value = '';
      } else if (res.data.code === 200) {
        alert('존재하지 않는 아이디입니다.');
        document.querySelector('#input_login_pwd').value = '';
      } else if (res.data.code === 201) {
        alert('탈퇴한 계정입니다.');
        document.querySelector('#input_login_id').value = '';
        document.querySelector('#input_login_pwd').value = '';
      }
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
}

function homeFunc(){
  location.href = '/'
}

document.getElementById('login_form').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    loginFunc();
  }
});



