const recipeUl = document.querySelector('ul');
const orderByLatestButton = document.querySelector('#orderByLatest');
const orderByStarsButton = document.querySelector('#orderByStars');
const orderByViewCountButton = document.querySelector('#orderByViewCount');

(async function recipeList() {
  orderByLatestButton.style.backgroundColor = '#FCA391';
  orderByStarsButton.style.backgroundColor = '#fff';
  orderByViewCountButton.style.backgroundColor = '#fff';
  recipeUl.innerHTML = '';

  const res = await axios({
    method: 'post',
    url: '/api/recipe/recipelist',
  });

  const allRecipe = res.data.allRecipe;

  console.log('allRecipe', allRecipe);

  allRecipe.forEach((recipe) => {
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
                    <div id="deleteButtonBox">
                        <button onclick="deleteFunc()">삭제</button>
                    </div>
                  </div>
                </div>
              </a>
            </li>
        `;
  });
})();

const orderByLatest = async () => {
  orderByLatestButton.style.backgroundColor = '#FCA391';
  orderByStarsButton.style.backgroundColor = '#fff';
  orderByViewCountButton.style.backgroundColor = '#fff';
  recipeUl.innerHTML = '';
  const res = await axios({
    method: 'post',
    url: '/api/recipe/recipelist',
  });
  const allRecipe = res.data.allRecipe;
  // console.log('allRecipe', allRecipe);
  allRecipe.forEach((recipe) => {
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
                    <div id="deleteButtonBox">
                        <button onclick="deleteFunc()">삭제</button>
                    </div>
                  </div>
                </div>
              </a>
            </li>
        `;
  });
};

const orderByStars = async () => {
  orderByLatestButton.style.backgroundColor = '#fff';
  orderByStarsButton.style.backgroundColor = '#FCA391';
  orderByViewCountButton.style.backgroundColor = '#fff';
  recipeUl.innerHTML = '';
  const res = await axios({
    method: 'post',
    url: '/api/recipe/recipelist',
  });
  const allRecipe = res.data.allRecipe;

  // 모든 레시피 별점 평균 계산
  const C = allRecipe.reduce((acc, recipe) => acc + parseFloat(recipe.rating), 0) / allRecipe.length;

  // m: 리뷰수의 중요도를 결정하는 계수 -> 사용자가 많아 전체적인 리뷰수가 높을수록 높게 잡아야함
  const m = 10;

  // 가중 평균 계산하여 allRecipe에 속성 추가
  allRecipe.forEach((recipe) => {
    recipe.wr = (recipe.reviewCount * parseFloat(recipe.rating) + C * m) / (parseInt(recipe.reviewCount) + m);
  });
  console.log('콘솔확인@@@', allRecipe);

  // wr값을 기준으로 내림차순으로 정렬
  allRecipe.sort((a, b) => b.wr - a.wr);

  allRecipe.forEach((recipe) => {
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
                    <div id="deleteButtonBox">
                        <button onclick="deleteFunc()">삭제</button>
                    </div>
                  </div>
                </div>
              </a>
            </li>
        `;
  });
};

const orderByViewCount = async () => {
  orderByLatestButton.style.backgroundColor = '#fff';
  orderByStarsButton.style.backgroundColor = '#fff';
  orderByViewCountButton.style.backgroundColor = '#FCA391';
  recipeUl.innerHTML = '';
  const res = await axios({
    method: 'post',
    url: '/api/recipe/recipelist',
  });
  const allRecipe = res.data.allRecipe;

  // viewCount값을 기준으로 내림차순으로 정렬
  allRecipe.sort((a, b) => b.viewCount - a.viewCount);

  allRecipe.forEach((recipe) => {
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
                    <div id="deleteButtonBox">
                        <button onclick="deleteFunc()">삭제</button>
                    </div>
                  </div>
                </div>
              </a>
            </li>
        `;
  });
};


const deleteFunc = async () => {
    
}