const recipeUl = document.querySelector('ul');
const orderByLatestButton = document.querySelector('#orderByLatest');
const orderByStarsButton = document.querySelector('#orderByStars');
const orderByViewCountButton = document.querySelector('#orderByViewCount');

let myRecipe = [];

let currentRecipes = [];

const recipesPerPage = 12; // 한페이지당 몇개의 레시피를 띄울지 정함
let currentPage = 1; //현재페이지
let totalPages = 0; //만들어질 전체 페이지
let pageButtons = []; //5개묶음으로된 배열(buttonPack)들이 원소인 배열
let buttonPack = [];
let currentButtonPack = 0;
let startRecipe = 0;
let endRecipe = recipesPerPage;

const makeRecipeCard = () => {
  currentRecipes = myRecipe.slice(startRecipe, endRecipe);

  recipeUl.innerHTML = '';
  currentRecipes.forEach((recipe) => {
    const ratingStars = parseInt(recipe.rating);
    let starsHtml = '';
    for (i = 1; i <= ratingStars; i++) {
      starsHtml += '<span class="material-icons-round star">star</span>';
    }

    recipeUl.innerHTML += `
        <li id="sample">
              <a href="/recipe/${recipe.recipeId}">
                <div id="recipeCard">
                  <div id="thumbnail">
                    <img src=${recipe.mainImg} />
                  </div>
                  <div id="content">
                    <div id="title">
                      <p>${recipe.recipeTitle}</p>
                    </div>
                    <div id="starsReviewCount">
                      <div id="stars">
                        ${starsHtml}
                        <span class="rating">(${recipe.rating})</span>
                      </div>
                      <div id="reviewCount">
                        <span>리뷰 (${recipe.reviewCount}개)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <div id="updateButtonBox">
                <button onclick="sendToUpdate(${recipe.recipeId})">수정</button>
              </div>
            </li>
        `;
  });
};

// 페이지네이션 버튼 생성하고 배열에 넣기
const makePageButtons = () => {
  totalPages = Math.ceil(myRecipe.length / recipesPerPage);

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
    paginationBox.innerHTML += `<span class="material-icons-round arrow_right" onclick="nextPages()">arrow_right</span>`;
  }
};

// next버튼 클릭시 페이지 번호 전환
const nextPages = () => {
  paginationBox.innerHTML = '';
  currentButtonPack++;
  if (currentButtonPack !== 0) {
    paginationBox.innerHTML += `<span class="material-icons-round arrow_left" onclick="prevPages()">arrow_left</span>`;
  }

  pageButtons[currentButtonPack].forEach((html) => {
    paginationBox.innerHTML += html;
  });

  if (currentButtonPack !== pageButtons.length - 1) {
    paginationBox.innerHTML += `<span class="material-icons-round arrow_right" onclick="nextPages()">arrow_right</span>`;
  }
};

// prev버튼 클릭시 페이지 번호 전환
const prevPages = () => {
  paginationBox.innerHTML = '';
  currentButtonPack--;
  if (currentButtonPack !== 0) {
    paginationBox.innerHTML += `<span class="material-icons-round arrow_left" onclick="prevPages()">arrow_left</span>`;
  }

  pageButtons[currentButtonPack].forEach((html) => {
    paginationBox.innerHTML += html;
  });

  if (currentButtonPack !== pageButtons.length - 1) {
    paginationBox.innerHTML += `<span class="material-icons-round arrow_right" onclick="nextPages()">arrow_right</span>`;
  }
};

// 페이지 번호 클릭시 레시피 펼치기
const selectPage = (page) => {
  const pageButton = document.querySelector(`#page${page}`);
  const allPageButton = document.querySelectorAll('#paginationBox span');

  allPageButton.forEach((button) => {
    button.style.backgroundColor = '#fff';
  });

  pageButton.style.backgroundColor = '#FCA391';

  endRecipe = page * recipesPerPage;
  startRecipe = endRecipe - recipesPerPage;
  makeRecipeCard();
};

// 새로고침
(async function recipeList() {
  orderByLatestButton.style.backgroundColor = '#FCA391';
  orderByStarsButton.style.backgroundColor = '#fff';
  orderByViewCountButton.style.backgroundColor = '#fff';
  recipeUl.innerHTML = '';

  let token;
  if(localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  } else if(sessionStorage.getItem('token')) {
    token = sessionStorage.getItem('token');
  }

  const res = await axios({
    method: 'post',
    url: '/api/recipe/myrecipe',
    headers: {
      Authorization: token,
    },
  });

  console.log('콘솔확인###', res.data);

  if (res.data.message === '토큰 정보 없음') {
    alert('로그인이 필요합니다.');
    document.location.href = '/login';
    return;
  }

  myRecipe = res.data.myRecipe;

  startRecipe = 0;
  endRecipe = recipesPerPage;
  makeRecipeCard();

  // 페이지네이션
  makePageButtons();

  console.log('myRecipe', myRecipe);
})();

const orderByLatest = async () => {
  orderByLatestButton.style.backgroundColor = '#FCA391';
  orderByStarsButton.style.backgroundColor = '#fff';
  orderByViewCountButton.style.backgroundColor = '#fff';
  recipeUl.innerHTML = '';
  const res = await axios({
    method: 'post',
    url: '/api/recipe/myrecipe',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
  myRecipe = res.data.myRecipe;

  startRecipe = 0;
  endRecipe = recipesPerPage;
  makeRecipeCard();
  // 페이지네이션
  makePageButtons();
};

const orderByStars = async () => {
  orderByLatestButton.style.backgroundColor = '#fff';
  orderByStarsButton.style.backgroundColor = '#FCA391';
  orderByViewCountButton.style.backgroundColor = '#fff';
  recipeUl.innerHTML = '';
  const res = await axios({
    method: 'post',
    url: '/api/recipe/myrecipe',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
  myRecipe = res.data.myRecipe;

  // 모든 레시피 별점 평균 계산
  const C = myRecipe.reduce((acc, recipe) => acc + parseFloat(recipe.rating), 0) / myRecipe.length;

  // m: 리뷰수의 중요도를 결정하는 계수 -> 사용자가 많아 전체적인 리뷰수가 높을수록 높게 잡아야함
  const m = 10;

  // 가중 평균 계산하여 myRecipe에 속성 추가
  myRecipe.forEach((recipe) => {
    recipe.wr = (recipe.reviewCount * parseFloat(recipe.rating) + C * m) / (parseInt(recipe.reviewCount) + m);
  });
  // console.log('콘솔확인@@@', myRecipe);

  // wr값을 기준으로 내림차순으로 정렬
  myRecipe.sort((a, b) => b.wr - a.wr);

  startRecipe = 0;
  endRecipe = recipesPerPage;
  makeRecipeCard();
  // 페이지네이션
  makePageButtons();
};

const orderByViewCount = async () => {
  orderByLatestButton.style.backgroundColor = '#fff';
  orderByStarsButton.style.backgroundColor = '#fff';
  orderByViewCountButton.style.backgroundColor = '#FCA391';
  recipeUl.innerHTML = '';
  const res = await axios({
    method: 'post',
    url: '/api/recipe/myrecipe',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
  myRecipe = res.data.myRecipe;

  // viewCount값을 기준으로 내림차순으로 정렬
  myRecipe.sort((a, b) => b.viewCount - a.viewCount);

  startRecipe = 0;
  endRecipe = recipesPerPage;
  makeRecipeCard();
  // 페이지네이션
  makePageButtons();
};

const sendToUpdate = (id) => {
  document.location.href = `/updaterecipe/${id}`;
};
