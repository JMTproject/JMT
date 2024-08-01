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
  };

  axios({
    method: 'post',
    url: '/api/user/login',
    data,
  }).then((res) => {
    console.log(res);
    if (res.data.result) {
      alert('로그인 성공! 메인 페이지로 이동합니다');
      localStorage.setItem("token", res.data.response.token);
      document.location.href = '/';
    }
  });
}

document.getElementById('login_form').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    loginFunc();
  }
});
