const loginA = document.querySelector('#login_a');
const logoutDiv = document.querySelector('#logout_div');
const token = localStorage.getItem('token');
const myPageBox = document.querySelector('.myPageBox');

if (token) {
  loginA.style.display = 'none';
} else {
  logoutDiv.style.display = 'none';
}

const logoutFunc = () => {
  if (!confirm('로그아웃 하시겠습니까?')) {
    return;
  }
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
  } else if (sessionStorage.getItem('token')) {
    sessionStorage.removeItem('token');
  }
  document.location.reload();
};

const myPageToggle = () => {
  if (myPageBox.style.display === 'none') {
    myPageBox.style.display = 'block';
  } else {
    myPageBox.style.display = 'none';
  }
};

// document.body.addEventListener('click', () => {
//     if(myPageBox.style.display === 'block') {
//         myPageBox.style.display = 'none'
//     }
// })
