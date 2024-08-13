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

// 숫자를 1000 단위로 변환하는 함수
const formatLargeNumber = (number) => {
    if (number < 1e3) return number;
    if (number >= 1e3 && number < 1e6) return +(number / 1e3).toFixed(1) + 'K';
    if (number >= 1e6 && number < 1e9) return +(number / 1e6).toFixed(1) + 'M';
    if (number >= 1e9 && number < 1e12) return +(number / 1e9).toFixed(1) + 'B';
    if (number >= 1e12) return +(number / 1e12).toFixed(1) + 'T';
};

const makeRecipeCard = () => {
    currentRecipes = myRecipe.slice(startRecipe, endRecipe);

    recipeUl.innerHTML = '';
    currentRecipes.forEach((recipe) => {
        // const ratingStars = parseInt(recipe.rating);
        // let starsHtml = '';
        // for (i = 1; i <= ratingStars; i++) {
        //     starsHtml += '<span class="material-icons-round star">star</span>';
        // }

        const fullStars = Math.floor(recipe.rating);
        const halfStar = recipe.rating % 1 !== 0;
        let starsHtml = '';

        for (let j = 0; j < fullStars; j++) {
            starsHtml += '★'; // 채워진 별
        }

        if (halfStar) {
            starsHtml += '☆'; // 반쯤 채워진 별
        }

        for (let j = fullStars + halfStar; j < 5; j++) {
            starsHtml += '☆'; // 빈 별
        }

        const formattedViewCount = formatLargeNumber(recipe.viewCount);
        const formattedReviewCount = formatLargeNumber(recipe.reviewCount);

        recipeUl.innerHTML += `
        <li id="sample">
              <a href="/recipe/${recipe.recipeId}">
                <div id="recipeCard">
                  <div id="thumbnail">
                    <img src=${recipe.mainImg} />
                  </div>
                  <div id="content">
                  <div id="viewCount">
                   <span class="material-symbols-rounded visibility">visibility</span>
                    <p>${formattedViewCount}</p>
                  </div>
                    <div id="title">
                      <p>${recipe.recipeTitle}</p>
                    </div>
                    <div id="starsReviewCount">
                      <div id="stars">
                        ${starsHtml}
                        <span class="rating">(${recipe.rating})</span>
                      </div>
                      <div id="reviewCount">
                        <span>리뷰 (${formattedReviewCount}개)</span>
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
const prevPages = () => {
    paginationBox.innerHTML = '';
    currentButtonPack--;
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
    const pageButton = document.querySelector(`#page${page}`);
    const allPageButton = document.querySelectorAll('#paginationBox span');

    allPageButton.forEach((button) => {
        // button.style.backgroundColor = '#fff';
        button.style.color = 'black';
    });

    // pageButton.style.backgroundColor = '#FCA391';
    pageButton.style.color = '#FCA391';

    endRecipe = page * recipesPerPage;
    startRecipe = endRecipe - recipesPerPage;
    makeRecipeCard();
};

// 새로고침
(async function recipeList() {
    orderByLatestButton.style.backgroundColor = '#fff';
    orderByLatestButton.style.color = 'black';
    orderByStarsButton.style.backgroundColor = '#FCA391';
    orderByStarsButton.style.color = '#fff';
    orderByViewCountButton.style.backgroundColor = '#fff';
    orderByViewCountButton.style.color = 'black';
    recipeUl.innerHTML = '';
    let token;
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token');
    } else if (sessionStorage.getItem('token')) {
        token = sessionStorage.getItem('token');
    }
    const res = await axios({
        method: 'post',
        url: '/api/recipe/myrecipe',
        headers: {
            Authorization: token,
        },
    });
    myRecipe = res.data.myRecipe;
    console.log('마이레시피', myRecipe);

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
})();

const orderByLatest = async () => {
    orderByLatestButton.style.backgroundColor = '#FCA391';
    orderByLatestButton.style.color = '#fff';
    orderByStarsButton.style.backgroundColor = '#fff';
    orderByStarsButton.style.color = 'black';
    orderByViewCountButton.style.backgroundColor = '#fff';
    orderByViewCountButton.style.color = 'black';
    recipeUl.innerHTML = '';
    let token;
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token');
    } else if (sessionStorage.getItem('token')) {
        token = sessionStorage.getItem('token');
    }
    const res = await axios({
        method: 'post',
        url: '/api/recipe/myrecipe',
        headers: {
            Authorization: token,
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
    orderByLatestButton.style.color = 'black';
    orderByStarsButton.style.backgroundColor = '#FCA391';
    orderByStarsButton.style.color = '#fff';
    orderByViewCountButton.style.backgroundColor = '#fff';
    orderByViewCountButton.style.color = 'black';
    recipeUl.innerHTML = '';
    let token;
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token');
    } else if (sessionStorage.getItem('token')) {
        token = sessionStorage.getItem('token');
    }
    const res = await axios({
        method: 'post',
        url: '/api/recipe/myrecipe',
        headers: {
            Authorization: token,
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
    orderByLatestButton.style.color = 'black';
    orderByStarsButton.style.backgroundColor = '#fff';
    orderByStarsButton.style.color = 'black';
    orderByViewCountButton.style.backgroundColor = '#FCA391';
    orderByViewCountButton.style.color = '#fff';
    recipeUl.innerHTML = '';
    let token;
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token');
    } else if (sessionStorage.getItem('token')) {
        token = sessionStorage.getItem('token');
    }
    const res = await axios({
        method: 'post',
        url: '/api/recipe/myrecipe',
        headers: {
            Authorization: token,
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

// 검색된 레시피 나열
const enterkeySearch = async () => {
    const keyword = document.querySelector('#searchInput').value;

    const data = { keyword };

    let token;
    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token');
    } else if (sessionStorage.getItem('token')) {
        token = sessionStorage.getItem('token');
    }

    const res = await axios({
        method: 'post',
        url: '/api/recipe/mysearch',
        data,
        headers: {
            Authorization: token,
        },
    });
    console.log('검색된 모든 레시피', res.data.myRecipe);

    myRecipe = res.data.myRecipe;

    // 별점순 조건문
    if (orderByStarsButton.style.backgroundColor === '#FCA391') {
        const C = myRecipe.reduce((acc, recipe) => acc + parseFloat(recipe.rating), 0) / myRecipe.length;
        const m = 10;
        myRecipe.forEach((recipe) => {
            recipe.wr = (recipe.reviewCount * parseFloat(recipe.rating) + C * m) / (parseInt(recipe.reviewCount) + m);
        });
        myRecipe.sort((a, b) => b.wr - a.wr);
        // 조회수순 조건문
    } else if (orderByViewCountButton.style.backgroundColor === '#FCA391') {
        myRecipe.sort((a, b) => b.viewCount - a.viewCount);
    }

    startRecipe = 0;
    endRecipe = recipesPerPage;
    makeRecipeCard();
    // 페이지네이션
    makePageButtons();
};

const sendToUpdate = (id) => {
    document.location.href = `/updaterecipe/${id}`;
};
