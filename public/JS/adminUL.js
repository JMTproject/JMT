const userListTbody = document.querySelector('tbody');

(async function recipeList() {
  userListTbody.innerHTML = '';

  const res = await axios({
    method: 'post',
    url: '/api/admin/userlist',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });

  console.log('콘솔확인###', res.data);

  if (res.data.message === '관리자 권한 없음') {
    alert('관리자 권한이 필요합니다.');
    document.location.href = '/';
    return;
  }

  if (res.data.message === '토큰 정보 없음') {
    alert('로그인 하세요');
    document.location.href = '/login';
    return;
  }

  const userList = res.data.userList;

  console.log('userList', userList);

  userList.forEach((user) => {
    userListTbody.innerHTML += `
         <tr>
              <td id="userId">${user.userId}</td>
              <td id="nickName">${user.nickName}</td>
              <td id="email">${user.email}</td>
              <td id="isEnabled">${user.isEnabled}</td>
              <td id="delete">
                <button onclick="deleteFunc(${user.userId})">삭제</button>
              </td>
            </tr>
        `;
  });
})();

const deleteFunc = async (id) => {
  if (!confirm('정말로 삭제하시겠습니까?')) {
    return;
  }
  const res = await axios({
    method: 'patch',
    url: '/api/admin/deleteuser',
    data: { id },
  });

  const result = res.data.result;

  if (result) {
    alert('계정이 삭제되었습니다.');
    document.location.reload();
  } else {
    alert('서버 문제로 삭제 실패');
  }
};
