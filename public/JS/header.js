const loginA = document.querySelector('#login_a');
const logoutDiv = document.querySelector('#logout_div');
const localToken = localStorage.getItem('token');
const sessionToken = sessionStorage.getItem('token');
const myPageBox = document.querySelector('.myPageBox');

if (localToken || sessionToken) {
  loginA.style.display = 'none';
} else {
  logoutDiv.style.display = 'none';
}

const logoutFunc = () => {
  if (!confirm('로그아웃 하시겠습니까?')) {
    return;
  }
  if (localToken || sessionToken) {
    localStorage.removeItem('token');
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
