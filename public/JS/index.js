const recipeUl = document.querySelector('ul');
(async function recipeList() {
  const res = await axios({
    method: 'post',
    url: '/api/recipe/recipelist',
  });
  const allRecipe = res.data.allRecipe;
  console.log('allRecipe', allRecipe);
  allRecipe.forEach((recipe) => {

    const ratingStars = parseInt(recipe.rating);
    let starsHtml = '';
    for(i=1; i<=ratingStars; i++) {
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
            </li>
        `;
  });
})();
