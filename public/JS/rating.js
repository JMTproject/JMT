// document.addEventListener('DOMContentLoaded', () => {
//     const stars = document.querySelectorAll('.star');
//     let currentRating = 0;

//     stars.forEach((star) => {
//         star.addEventListener('mouseover', (e) => {
//             highlightStars(e.target.dataset.value);
//         });

//         star.addEventListener('mouseout', () => {
//             highlightStars(currentRating);
//         });

//         star.addEventListener('click', (e) => {
//             currentRating = e.target.dataset.value;
//         });

//         star.addEventListener('mousedown', (e) => {
//             e.preventDefault();
//             document.addEventListener('mousemove', mouseMoveHandler);
//             document.addEventListener('mouseup', mouseUpHandler);
//         });

//         function mouseMoveHandler(e) {
//             const boundingRect = e.target.closest('.stars').getBoundingClientRect();
//             const starsWidth = boundingRect.width;
//             const offsetX = e.clientX - boundingRect.left;
//             const rating = Math.ceil((offsetX / starsWidth) * stars.length);
//             highlightStars(rating);
//         }

//         function mouseUpHandler(e) {
//             const boundingRect = e.target.closest('.stars').getBoundingClientRect();
//             const starsWidth = boundingRect.width;
//             const offsetX = e.clientX - boundingRect.left;
//             currentRating = Math.ceil((offsetX / starsWidth) * stars.length);
//             document.removeEventListener('mousemove', mouseMoveHandler);
//             document.removeEventListener('mouseup', mouseUpHandler);
//         }

//         function highlightStars(rating) {
//             stars.forEach((star) => {
//                 star.classList.toggle('highlight', star.dataset.value <= rating);
//             });
//         }
//     });

//     document.getElementById('submit-rating').addEventListener('click', () => {
//         axios
//             .post('../../models/review.js', { [`${currentRating}Star`]: 1 })
//             .then((response) => {
//                 alert('Rating submitted successfully!');
//             })
//             .catch((error) => {
//                 console.error('Error submitting rating:', error);
//             });
//     });
// });

// // $(function () {
// //     var password = $('.review_2').val();

// //     $('.review_2').on('blur', function () {
// //         password = $('.review_2').val();
// //         if (password.length < 10) {
// //             $('.review_2').addClass('is-invalid');
// //             $('.review_2 ~ .tooltip').addClass('show');
// //             $('.review_2 ~ .tooltip').text('MINIMUM 8 CHARACTERS');
// //             return (passwordFlag = false);
// //         } else {
// //             $('.review_2').removeClass('is-invalid');
// //             $('.review_2 ~ .tooltip').removeClass('show');
// //             return (passwordFlag = true);
// //         }
// //     });
// // });

document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    let currentRating = 0;
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

    document.getElementById('submitReview').addEventListener('click', () => {
        const reviewContent = document.getElementById('reviewContent').value;
        const formData = new FormData();
        formData.append('profileImg', '/path/to/default/profile.png'); // 기본 프로필 이미지 경로
        formData.append('nickName', '닉네임'); // 임의의 닉네임
        formData.append('reviewDate', new Date().toISOString());
        formData.append('reviewRating', currentRating);
        formData.append('reviewContent', reviewContent);
        formData.append('reviewImg', fileInput.files[0]);

        axios
            .post('/api/reviews', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                alert('리뷰가 성공적으로 등록되었습니다.');
                addReviewToDOM(response.data);
            })
            .catch((error) => {
                console.error('리뷰 등록 중 오류 발생:', error);
            });
    });

    function addReviewToDOM(review) {
        const reviewContainer = document.createElement('div');
        reviewContainer.classList.add('review');

        reviewContainer.innerHTML = `
            <div class="review_1">
                <img class="review_profile_img" src="${review.profileImg}" alt="Profile Image" />
                <div class="review_profile">
                    <div class="review_info">
                        <p>${review.nickName}</p>
                        <span class="review_date">${new Date(review.reviewDate).toLocaleString()}</span>
                        <div class="review_rating">${'★'.repeat(review.reviewRating)}</div>
                    </div>
                    <div class="review_content">
                        <p>${review.reviewContent}</p>
                    </div>
                </div>
                <img class="review_img" src="${review.reviewImg}" alt="Review Image" />
            </div>
        `;

        document.getElementById('reviews').prepend(reviewContainer);
    }
});
