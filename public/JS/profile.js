(async function () {
  const res = await axios({
    method: 'get',
    url: '/api/user/info',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  console.log(res.data.response);
  const { email, nickName, profileImg, aboutMe } = res.data.response;
  document.querySelector('#read_email').value = email;
  document.querySelector('#update_NN').value = nickName;
  document.querySelector('#viewImg').value = profileImg;
  document.querySelector('#introduceBox').value = aboutMe;
})();
