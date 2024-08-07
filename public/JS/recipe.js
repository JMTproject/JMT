let currentRating = 0;

document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    // const fileInput = document.getElementById('file_1');

    stars.forEach((star) => {
        star.addEventListener('mouseover', (e) => {
            highlightStars(e.target.dataset.value);
        });

        star.addEventListener('mouseout', () => {
            highlightStars(currentRating);
        });

        star.addEventListener('click', (e) => {
            currentRating = e.target.dataset.value;
        });

        star.addEventListener('mousedown', (e) => {
            e.preventDefault();
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });

        function mouseMoveHandler(e) {
            const boundingRect = e.target.closest('.stars').getBoundingClientRect();
            const starsWidth = boundingRect.width;
            const offsetX = e.clientX - boundingRect.left;
            const rating = Math.ceil((offsetX / starsWidth) * stars.length);
            highlightStars(rating);
        }

        function mouseUpHandler(e) {
            const boundingRect = e.target.closest('.stars').getBoundingClientRect();
            const starsWidth = boundingRect.width;
            const offsetX = e.clientX - boundingRect.left;
            currentRating = Math.ceil((offsetX / starsWidth) * stars.length);
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        function highlightStars(rating) {
            stars.forEach((star) => {
                star.classList.toggle('highlight', star.dataset.value <= rating);
            });
        }
    });
});

// function updateFunc() {
//     const reviewContent = document.getElementById('reviewContent').value;
//     const fileInput = document.getElementById('file_1');
//     const recipeId = window.location.pathname.split('/recipe/').pop();

//     if (!reviewContent || currentRating === 0) {
//         alert('별점과 리뷰 내용을 입력해주세요.');
//         return;
//     }

//     const formData = new FormData();
//     formData.append('reviewRating', currentRating);
//     formData.append('reviewContent', reviewContent);
//     formData.append('reviewImg', fileInput.files[0]);

//     axios({
//         method: 'post',
//         url: '/api/review/recipe/' + recipeId + '/reviews',
//         data: formData,
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//     })
//         .then((response) => {
//             alert('리뷰가 성공적으로 등록되었습니다.');
//             location.reload();
//         })
//         .catch((error) => {
//             console.error('리뷰 등록 중 오류 발생:', error);
//         });
// }

document
    .addEventListener('DOMContentLoaded', async () => {
        const recipeId = window.location.pathname.split('/recipe/').pop();
        const res = await axios({
            method: 'get',
            url: `/api/recipe/data/${recipeId}`,
        });
        console.log(res.data);

        document.getElementById('recipe-mainImg').src = res.data.recipe.mainImg;
        document.getElementById('recipeTitle').innerText = res.data.recipe.recipeTitle;
        document.getElementById('recipe-description').innerText = res.data.recipe.description;
        document.getElementById('recipe-servings').innerText = res.data.recipe.servings;
        document.getElementById('recipe-cookingTime').innerText = res.data.recipe.cookingTime;

        const ingredientsList = document.querySelector('.ingredients_box');
        res.data.ingredients.forEach((ingredient) => {
            const ingredientDiv = document.createElement('div');
            ingredientDiv.classList.add('ingredients_list');
            ingredientDiv.innerHTML = `
                <div class="ingredients_1"><p>${ingredient.ingredientName}</p></div>
                <div class="ingredients_2"><p>${ingredient.quantity}</p></div>
                <div id="ingredients_buy">
                            <button type="button" onclick="purchase(${ingredient.ingredientId})" id="buy">구매</button>
                </div>
            `;
            ingredientsList.appendChild(ingredientDiv);
        });

        const cookwareList = document.querySelector('#cookware_list');
        res.data.cookingTools.forEach((cookingTool) => {
            const toolDiv = document.createElement('div');
            toolDiv.classList.add('cookware_1');
            toolDiv.innerHTML = `<div><p>${cookingTool.toolName}</p></div>`;
            cookwareList.appendChild(toolDiv);
        });

        const cookingSteps = document.querySelector('#process_list');
        res.data.cookingSteps.forEach((cookingStep) => {
            const stepDiv = document.createElement('div');
            stepDiv.classList.add('process_1');
            stepDiv.innerHTML = `
                <div class="process_number">${cookingStep.step}</div>
                <div class="process_step">
                    <div class="process_description">${cookingStep.content}</div>
                    <img src="${cookingStep.stepImg}" alt="Step Image">
                </div>
            `;
            cookingSteps.appendChild(stepDiv);
        });

        document.getElementById('writer-profileImg').src = res.data.user.profileImg;
        document.getElementById('writer-nickName').innerText = res.data.user.nickName;
        document.getElementById('writer-aboutMe').innerText = res.data.user.aboutMe;

        document.getElementById('review-count').innerText = res.data.reviews.length;

        const reviews = document.querySelector('.review_box');
        res.data.reviews.forEach((review) => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review');

            reviewDiv.innerHTML = `
            <div class="review_1">
                <img class="review_profile_img" src="${review.user.profileImg}" alt="Profile Image">
                <div class="review_profile">
                    <div class="review_info">
                        <p>${review.user.nickName}</p>
                        <span class="review_date">${new Date(review.createdAt).toLocaleString('ko-KR')}</span>
                        <div class="review_rating">${'★'.repeat(review.rating)}</div>
                    </div>
                    <div class="review_content">
                        <p>${review.content}</p>
                    </div>
                </div>
                <img class="review_img" src="${review.reviewImg}" alt="Review Image">
            </div>
            `;
            reviews.appendChild(reviewDiv);
        });
        const averageRating = res.data.averageRating;
        document.getElementById('review_rating_av').textContent = averageRating.toFixed(1);

        const starsContainer = document.getElementById('average_stars');
        const fullStars = Math.floor(averageRating);
        const halfStar = averageRating % 1 !== 0;
        starsContainer.innerHTML = '';

        for (let i = 0; i < fullStars; i++) {
            const star = document.createElement('span');
            star.classList.add('star');
            star.textContent = '★';
            starsContainer.appendChild(star);
        }

        if (halfStar) {
            const halfStarElement = document.createElement('span');
            halfStarElement.classList.add('star');
            halfStarElement.textContent = '☆';
            starsContainer.appendChild(halfStarElement);
        }

        for (let i = fullStars + halfStar; i < 5; i++) {
            const emptyStar = document.createElement('span');
            emptyStar.classList.add('star');
            emptyStar.textContent = '☆';
            starsContainer.appendChild(emptyStar);
        }
        const stars = document.querySelectorAll('.star');
        const fileInput = document.getElementById('file_1');

        stars.forEach((star) => {
            star.addEventListener('mouseover', (e) => {
                highlightStars(e.target.dataset.value);
            });

            star.addEventListener('mouseout', () => {
                highlightStars(currentRating);
            });

            star.addEventListener('click', (e) => {
                currentRating = e.target.dataset.value;
            });

            star.addEventListener('mousedown', (e) => {
                e.preventDefault();
                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
            });

            function mouseMoveHandler(e) {
                const boundingRect = e.target.closest('.stars').getBoundingClientRect();
                const starsWidth = boundingRect.width;
                const offsetX = e.clientX - boundingRect.left;
                const rating = Math.ceil((offsetX / starsWidth) * stars.length);
                highlightStars(rating);
            }

            function mouseUpHandler(e) {
                const boundingRect = e.target.closest('.stars').getBoundingClientRect();
                const starsWidth = boundingRect.width;
                const offsetX = e.clientX - boundingRect.left;
                currentRating = Math.ceil((offsetX / starsWidth) * stars.length);
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            }

            function highlightStars(rating) {
                stars.forEach((star) => {
                    star.classList.toggle('highlight', star.dataset.value <= rating);
                });
            }
        });
    })
    .catch((error) => {
        console.error('Error fetching recipe data:', error);
    });

async function updateFunc() {
    const reviewContent = document.getElementById('reviewContent').value;
    const fileInput = document.getElementById('file_1');
    const recipeId = window.location.pathname.split('/recipe/').pop();

    if (!reviewContent || currentRating === 0) {
        alert('별점과 리뷰 내용을 입력해주세요.');
        return;
    }

    const formData = new FormData();
    formData.append('rating', currentRating);
    formData.append('content', reviewContent);
    formData.append('reviewImg', fileInput.files[0]);
    const res = await axios({
        method: 'post',
        url: `/api/recipe/data/${recipeId}/reviews`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((response) => {
            alert('리뷰가 성공적으로 등록되었습니다.');
            addReviewToDOM(reviewContent, currentRating, fileInput.files[0]);
        })
        .catch((error) => {
            console.error('리뷰 등록 중 오류 발생:', error);
        });
}

function addReviewToDOM(content, rating, imageFile) {
    const reviewsContainer = document.getElementById('reviews'); // 리뷰가 표시될 컨테이너 요소
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review');

    // 별점 추가
    const starsElement = document.createElement('div');
    starsElement.classList.add('stars');
    for (let i = 0; i < rating; i++) {
        const star = document.createElement('span');
        star.classList.add('star');
        star.textContent = '★';
        starsElement.appendChild(star);
    }
    for (let i = rating; i < 5; i++) {
        const emptyStar = document.createElement('span');
        emptyStar.classList.add('star');
        emptyStar.textContent = '☆';
        starsElement.appendChild(emptyStar);
    }
    reviewElement.appendChild(starsElement);

    // 리뷰 내용 추가
    const contentElement = document.createElement('p');
    contentElement.textContent = content;
    reviewElement.appendChild(contentElement);

    // 이미지 추가
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.alt = '리뷰 이미지';
            reviewElement.appendChild(imgElement);
        };
        reader.readAsDataURL(imageFile);
    }

    reviewsContainer.appendChild(reviewElement);
}