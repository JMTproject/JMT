(async function () {

  if(localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  } else if(sessionStorage.getItem('token')) {
    token = sessionStorage.getItem('token');
  }

  const res = await axios({
    method: 'get',
    url: '/api/user/info',
    headers: {
      Authorization: token,
    },
  });


  
  console.log(res.data.response);
  const { email, nickName, profileImg, aboutMe } = res.data.response;
  document.querySelector('#read_email').value = email;
  document.querySelector('#update_NN').value = nickName;
  document.querySelector('#viewImg').src = profileImg;
  document.querySelector('#introduceBox').innerText = aboutMe;
})();

document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.querySelector('#read_email');
  const passwordInput = document.querySelector('#now_pwd');
  const currentPassword = document.querySelector('#pwResultBox');
  const pwd1 = document.querySelector('#update_Pwd1');
  const pwd2 = document.querySelector('#update_Pwd2');
  const pwdCheck = document.querySelector('#pwdCheck');

  passwordInput.addEventListener('input', () => {
    axios({
      method: 'post',
      url: '/api/user/login',
      data: {
        email: emailInput.value,
        password: passwordInput.value,
      },
    }).then((response) => {
      if (response.data.result) {
        currentPassword.textContent = '현재 비밀번호가 일치합니다.';
        currentPassword.style.color = 'green';
      } else {
        currentPassword.textContent = '비밀번호가 일치하지 않습니다.';
        currentPassword.style.color = 'red';
      }
    });
  });

  function checkPasswords() {
    if (pwd1.value === pwd2.value) {
      pwdCheck.textContent = '비밀번호가 일치합니다.';
      pwdCheck.style.color = 'green';
    } else {
      pwdCheck.textContent = '비밀번호가 일치하지 않습니다.';
      pwdCheck.style.color = 'red';
    }
  }

  pwd1.addEventListener('input', checkPasswords);
  pwd2.addEventListener('input', checkPasswords);
});

function fileUploadFunc() {
  const fileInput = document.getElementById('fileInput');
  const imgElement = document.getElementById('viewImg');
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imgElement.src = e.target.result;
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
}

async function updateFunc() {
  const data = {
    email: document.querySelector('#read_email').value,
    password: document.querySelector('#now_pwd').value,
  };

  const resData = {
    password: document.querySelector('#update_Pwd1').value,
    nickName: document.querySelector('#update_NN').value,
    profileImg: document.querySelector('#viewImg').src,
    aboutMe: document.querySelector('#introduceBox').value,
  };

  const pwd1 = document.querySelector('#update_Pwd1');
  const pwd2 = document.querySelector('#update_Pwd2');

  const res = axios({
    method: 'post',
    url: '/api/user/login',
    data,
  }).then((res) => {
    if (res.data.result) {
      if (pwd1.value === pwd2.value && pwd1.value !== '') {
        axios({
          method: 'patch',
          url: '/api/user/update',
          data: resData,
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        });
        location.reload();
        alert('프로필 수정이 완료되었습니다.');
      } else if (pwd1.value === pwd2.value && pwd1.value === '') {
        axios({
          method: 'patch',
          url: '/api/user/update',
          data: {
            password: document.querySelector('#now_pwd').value,
            nickName: document.querySelector('#update_NN').value,
            profileImg: document.querySelector('#viewImg').src,
            aboutMe: document.querySelector('#introduceBox').value,
          },
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        });
        location.reload();
        alert('프로필 수정이 완료되었습니다.');
      } else {
        alert('비밀번호가 일치하지않습니다.');
      }
    } else {
      alert('현재 비밀번호가 일치하지 않습니다.');
    }
  });
}

async function deleteFunc() {
  if (!confirm('탈퇴하시겠습니까?')) {
    return;
  }
  axios({
    method: 'patch',
    url: '/api/user/delete',
    data: {
      isEnabled: false,
    },
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  });
  alert('회원탈퇴가 완료되었습니다');
  document.location.href = '/';
  localStorage.removeItem('token');
}
