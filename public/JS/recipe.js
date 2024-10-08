let currentRating = 0;

// 리뷰 수정 함수
async function editFunc(reviewId) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const reviewDiv = document.querySelector(`button[data-id="${reviewId}"]`).closest('.review');
    const reviewContentDiv = reviewDiv.querySelector('.review_content');
    const currentContent = reviewContentDiv.querySelector('p').textContent;

    const textarea = document.createElement('textarea');
    textarea.classList.add('review-edit-textarea');
    textarea.value = currentContent;

    reviewContentDiv.innerHTML = '';
    reviewContentDiv.appendChild(textarea);

    const saveButton = document.createElement('button');
    saveButton.textContent = '수정 완료';
    saveButton.classList.add('save-btn');

    saveButton.addEventListener('click', async () => {
        const newContent = textarea.value;
        try {
            await axios({
                method: 'put',
                url: `/api/recipe/data/${reviewId}/update`,
                data: { content: newContent },
                headers: {
                    Authorization: token,
                },
            });
            alert('리뷰가 성공적으로 수정되었습니다.');
            document.location.reload();
        } catch (error) {
            console.error('리뷰 수정 중 오류 발생:', error);
        }
    });

    reviewContentDiv.appendChild(saveButton);
}

async function deleteFunc(reviewId) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
        try {
            await axios({
                method: 'put',
                url: `/api/recipe/data/${reviewId}/delete`,
                data: { isEnabled: false },
                headers: {
                    Authorization: token,
                },
            });
            alert('리뷰가 성공적으로 삭제되었습니다.');
            document.location.reload();
        } catch (error) {
            console.error('리뷰 삭제 중 오류 발생:', error);
        }
    }
}

//별점 입력창 드래그
document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');

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

//레시피 정보 불러오기
document.addEventListener('DOMContentLoaded', async () => {
    // if (localStorage.getItem('token')) {
    //     token = localStorage.getItem('token');
    // } else if (sessionStorage.getItem('token')) {
    //     token = sessionStorage.getItem('token');
    // }

    // JWT 토큰에서 사용자 정보 추출
    let currentUserId = null;
    let currentEmail = null;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        currentUserId = payload.userId;
        currentEmail = payload.email;
    }

    try {
        const recipeId = window.location.pathname.split('/recipe/').pop();
        const res = await axios({
            method: 'get',
            url: `/api/recipe/data/${recipeId}`,
            // headers: {
            //     Authorization: token,
            // },
        });
        console.log(res.data);

        //조회수 숫자 표기
        const viewCount = res.data.recipe.viewCount;
        const formatLargeNumber = (viewCount) => {
            if (viewCount < 1e3) return viewCount;
            if (viewCount >= 1e3 && viewCount < 1e6) return +(viewCount / 1e3).toFixed(1) + 'K';
            if (viewCount >= 1e6 && viewCount < 1e9) return +(viewCount / 1e6).toFixed(1) + 'M';
            if (viewCount >= 1e9 && viewCount < 1e12) return +(viewCount / 1e9).toFixed(1) + 'B';
            if (viewCount >= 1e12) return +(viewCount / 1e12).toFixed(1) + 'T';
        };

        //레시피 정보 가져오기
        document.getElementById('view-count').innerText = formatLargeNumber(viewCount);
        document.getElementById('recipe-mainImg').src = res.data.recipe.mainImg;
        document.getElementById('recipeTitle').innerText = res.data.recipe.recipeTitle;
        document.getElementById('recipe-description').innerText = res.data.recipe.description;
        document.getElementById('recipe-servings').innerText = res.data.recipe.servings;
        document.getElementById('recipe-cookingTime').innerText = res.data.recipe.cookingTime;

        //레시피 재료 가져오기
        const ingredientsList = document.querySelector('.ingredients_box');
        res.data.ingredients.forEach((ingredient) => {
            const ingredientDiv = document.createElement('div');
            ingredientDiv.classList.add('ingredients_list');
            ingredientDiv.innerHTML = `
                <div class="ingredients_1"><p>${ingredient.ingredientName}</p></div>
                <div class="ingredients_2"><p>${ingredient.quantity}</p></div>
                <div id="ingredients_buy">
                            <button type="button" onclick="purchase('${ingredient.ingredientName}')" id="buy">구매</button>
                </div>
            `;
            ingredientsList.appendChild(ingredientDiv);
        });

        //요리 도구 가져오기
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
                    <div class="process_description ${cookingStep.stepImg ? '' : 'no-img'}">${cookingStep.content}</div>
                    <img src="${cookingStep.stepImg}" alt="Step Image" ${
                cookingStep.stepImg ? '' : 'style="display:none;"'
            }>
                </div>
            `;
            cookingSteps.appendChild(stepDiv);
        });

        //레시피 작성자 정보 가져오기
        document.getElementById('writer-profileImg').src = res.data.user.profileImg;
        document.getElementById('writer-nickName').innerText = res.data.user.nickName;
        document.getElementById('writer-aboutMe').innerText = res.data.user.aboutMe;

        document.getElementById('review-count').innerText = res.data.reviews.length;

        //리뷰 불러와서 추가하기
        const reviewBox = document.querySelector('.review_box');
        const reviewArray = res.data.reviews;

        // const maxVisibleReviews = 5;

        for (let i = 0; i < reviewArray.length; i++) {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review');

            const profileImage = reviewArray[i].user ? reviewArray[i].user.profileImg : '';
            const nickName = reviewArray[i].user ? reviewArray[i].user.nickName : '';
            const reviewInfoClass = reviewArray[i].reviewImg ? '' : 'no-img';

            // 현재 사용자와 리뷰 작성자를 비교하거나 관리자 여부 확인
            const currentUser = reviewArray[i].userId === currentUserId || currentEmail === 'admin@admin.com';

            const fullStars = Math.floor(reviewArray[i].rating);
            const halfStar = reviewArray[i].rating % 1 !== 0;
            let starHtml = '';

            for (let j = 0; j < fullStars; j++) {
                starHtml += '★';
            }

            if (halfStar) {
                starHtml += '☆';
            }

            for (let j = fullStars + halfStar; j < 5; j++) {
                starHtml += '☆';
            }

            const html = `<div class="review">
            <div class="review_1">
                <img class="review_profile_img" src="${profileImage}" alt="Profile Image"> 
                <div class="review_profile">
                    <div class="review_info ${reviewInfoClass}">
                        <p>${nickName}</p>
                        <span class="review_date">${new Date(reviewArray[i].createdAt).toLocaleString('ko-KR')}</span>
                        <div class="review_rating">${starHtml}</div>
                    </div>
                    <div class="edit-button">
                        ${
                            currentUser
                                ? `
                        <button class="edit-btn" data-id="${reviewArray[i].reviewId}" onClick="editFunc(${reviewArray[i].reviewId})">
                            <span class="material-symbols-rounded edit">edit</span>
                        </button> 
                        <button class="delete-btn" data-id="${reviewArray[i].reviewId}" onClick="deleteFunc(${reviewArray[i].reviewId})">
                            <span class="material-symbols-rounded delete">delete</span>
                        </button> 
                        `
                                : ''
                        }
                    </div>
                    <div class="review_content">
                        <p>${reviewArray[i].content}</p>
                    </div>
                </div>
                <img class="review_img" src="${reviewArray[i].reviewImg}" alt="Review Image"${
                reviewArray[i].reviewImg ? '' : 'style="display:none;"'
            }>
            </div>
        </div>`;
            reviewBox.insertAdjacentHTML('beforeend', html);
        }

        // // 전체보기 버튼 추가 및 처리
        // if (reviewArray.length > maxVisibleReviews) {
        //     const showMoreButton = document.createElement('button');
        //     showMoreButton.id = 'show-more-reviews';
        //     showMoreButton.textContent = '전체보기';
        //     showMoreButton.classList.add('show-more-reviews-btn');

        //     showMoreButton.addEventListener('click', () => {
        //         document.querySelectorAll('.review_1').forEach((review, index) => {
        //             if (index >= maxVisibleReviews) {
        //                 review.style.display = 'block';
        //             }
        //         });
        //         showMoreButton.style.display = 'none'; // 버튼 숨기기
        //     });

        //     // 버튼을 리뷰 박스 맨 아래에 추가
        //     reviewBox.appendChild(showMoreButton);
        // }

        // //리뷰 수정 버튼
        // document.querySelectorAll('.edit-btn').forEach((button) => {
        //     button.addEventListener('click', async (e) => {
        //         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        //         const reviewId = e.target.dataset.id;
        //         const reviewDiv = e.target.closest('.review');
        //         const reviewContentDiv = reviewDiv.querySelector('.review_content');
        //         const currentContent = reviewContentDiv.querySelector('p').textContent;
        //         console.log('###########', e.target.dataset);

        //         const textarea = document.createElement('textarea');
        //         textarea.classList.add('review-edit-textarea');
        //         textarea.value = currentContent;

        //         reviewContentDiv.innerHTML = '';
        //         reviewContentDiv.appendChild(textarea);

        //         const saveButton = document.createElement('button');
        //         saveButton.textContent = '수정 완료';
        //         saveButton.classList.add('save-btn');

        //         saveButton.addEventListener('click', async () => {
        //             const newContent = textarea.value;
        //             try {
        //                 await axios({
        //                     method: 'put',
        //                     url: `/api/recipe/data/${reviewId}/update`,
        //                     data: { content: newContent },
        //                     headers: {
        //                         Authorization: token,
        //                     },
        //                 });
        //                 alert('리뷰가 성공적으로 수정되었습니다.');
        //                 document.location.reload();
        //             } catch (error) {
        //                 console.error('리뷰 수정 중 오류 발생:', error);
        //             }
        //         });

        //         reviewContentDiv.appendChild(saveButton);
        //     });
        // });

        // // 리뷰 삭제 버튼
        // document.querySelectorAll('.delete-btn').forEach((button) => {
        //     button.addEventListener('click', async (e) => {
        //         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        //         const reviewId = e.target.dataset.id;
        //         if (confirm('정말로 이 리뷰를 삭제하시겠습니까?')) {
        //             try {
        //                 await axios({
        //                     method: 'put',
        //                     url: `/api/recipe/data/${reviewId}/delete`,
        //                     data: { isEnabled: false },
        //                     headers: {
        //                         Authorization: token,
        //                     },
        //                 });
        //                 alert('리뷰가 성공적으로 삭제되었습니다.');
        //                 document.location.reload();
        //             } catch (error) {
        //                 console.error('리뷰 삭제 중 오류 발생:', error);
        //             }
        //         }
        //     });
        // });

        //별점 평균 값 구하기
        const averageRating = res.data.averageRating;
        if (averageRating !== null && averageRating !== undefined) {
            document.getElementById('review_rating_av').textContent = averageRating.toFixed(1);
        } else {
            document.getElementById('review_rating_av').textContent = '0.00';
        }

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
    } catch (error) {
        console.error('Error fetching recipe data:', error);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file_1');
    const photoUploadDiv = document.querySelector('.review_photo_upload');

    fileInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                // 기존 이미지 제거
                const existingImg = photoUploadDiv.querySelector('img');
                if (existingImg) {
                    existingImg.remove();
                }

                // 새로운 이미지 요소 생성
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Preview Image';

                // 미리보기 이미지 추가
                photoUploadDiv.appendChild(img);
            };

            reader.readAsDataURL(file); // 파일을 Data URL로 변환
        }
    });
});

//리뷰 쓰기 업데이트
async function updateFunc() {
    const reviewContent = document.getElementById('reviewContent').value;
    const fileInput = document.getElementById('file_1');
    const recipeId = window.location.pathname.split('/recipe/').pop();

    if (localStorage.getItem('token')) {
        token = localStorage.getItem('token');
    } else if (sessionStorage.getItem('token')) {
        token = sessionStorage.getItem('token');
    } else {
        alert('로그인이 필요합니다!');
        return;
    }

    if (!reviewContent || currentRating === 0) {
        alert('별점과 리뷰 내용을 입력해주세요.');
        return;
    }
    const formData = new FormData();
    formData.append('rating', currentRating);
    formData.append('content', reviewContent);
    formData.append('files', fileInput.files[0]);
    const res = await axios({
        method: 'post',
        url: `/api/recipe/data/${recipeId}/reviews`,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token,
        },
    })
        .then((res) => {
            alert('리뷰가 성공적으로 등록되었습니다.');
            document.location.reload();
        })
        .catch((error) => {
            console.error('리뷰 등록 중 오류 발생:', error);
        });
}
