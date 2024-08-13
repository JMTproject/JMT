const userListTbody = document.querySelector('tbody');

let userList = [];
let currentUsers = [];

const usersPerPage = 20; // 한페이지당 몇개의 유저를 띄울지 정함
let currentPage = 1; //현재페이지
let totalPages = 0; //만들어질 전체 페이지
let pageButtons = []; //5개묶음으로된 배열(buttonPack)들이 원소인 배열
let buttonPack = [];
let currentButtonPack = 0;
let startUser = 0;
let endUser = usersPerPage;



const makeUserList = () => {
  currentUsers = userList.slice(startUser, endUser);

  userListTbody.innerHTML = '';

  currentUsers.forEach((user) => {
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
}




// 페이지네이션 버튼 생성하고 배열에 넣기
const makePageButtons = () => {
  totalPages = Math.ceil(userList.length / usersPerPage);

  for (i = 1; i <= totalPages; i++) {
    // 버튼 5개씩 buttonPack에 넣기
    if (buttonPack.length === 5) {
      pageButtons.push(buttonPack);
      buttonPack = [];
    }
    buttonPack.push(`<span id="page${i}" onclick='selectPage(${i})'>${i}</span>`);
    if (i === totalPages) {
      pageButtons.push(buttonPack);
      buttonPack = [];
    }
  }
  paginationBox.innerHTML = '';
  currentButtonPack = 0;

  pageButtons[currentButtonPack].forEach((html) => {
    paginationBox.innerHTML += html;
  });

  if (currentButtonPack !== pageButtons.length - 1) {
    paginationBox.innerHTML += `<span class="material-symbols-rounded chevron_right" onclick="nextPages()">chevron_right</span>`;
  }
};

// next버튼 클릭시 페이지 번호 전환
const nextPages = () => {
  paginationBox.innerHTML = '';
  currentButtonPack++;
  if (currentButtonPack !== 0) {
    paginationBox.innerHTML += `<span class="material-symbols-rounded chevron_left" onclick="prevPages()">chevron_left</span>`;
  }

  pageButtons[currentButtonPack].forEach((html) => {
    paginationBox.innerHTML += html;
  });

  if (currentButtonPack !== pageButtons.length - 1) {
    paginationBox.innerHTML += `<span class="material-symbols-rounded chevron_right" onclick="nextPages()">chevron_right</span>`;
  }
};

// prev버튼 클릭시 페이지 번호 전환
const prevPages = () => {   currentButtonPack--;
  if (currentButtonPack !== 0) {
    paginationBox.innerHTML += `<span class="material-symbols-rounded chevron_left" onclick="prevPages()">chevron_left</span>`;
  }

  pageButtons[currentButtonPack].forEach((html) => {
    paginationBox.innerHTML += html;
  });

  if (currentButtonPack !== pageButtons.length - 1) {
    paginationBox.innerHTML += `<span class="material-symbols-rounded chevron_right" onclick="nextPages()">chevron_right</span>`;
  }
};

// 페이지 번호 클릭시 레시피 펼치기
const selectPage = (page) => {
  const pageButton = document.querySelector(`#page${page}`)
  const allPageButton = document.querySelectorAll('#paginationBox span')

  allPageButton.forEach((button) => {
    button.style.backgroundColor = '#fff'
  })

  pageButton.style.backgroundColor = '#FCA391'


  endUser = page * usersPerPage;
  startUser = endUser - usersPerPage;
  makeUserList();

};







(async function recipeList() {
  userListTbody.innerHTML = '';

  let token;
  if(localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  } else if(sessionStorage.getItem('token')) {
    token = sessionStorage.getItem('token');
  }

  const res = await axios({
    method: 'post',
    url: '/api/admin/userlist',
    headers: {
      Authorization: token,
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

  userList = res.data.userList;
  console.log('userList', userList);

  startUser = 0;
  endUser = usersPerPage;
  makeUserList();

  // 페이지네이션
  makePageButtons();

  
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
