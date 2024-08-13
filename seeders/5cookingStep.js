'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'cookingSteps',
            [
                {
                    step: 1,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/food-example.jpg',
                    recipeId: 1,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    step: 2,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/food-example.jpg',
                    recipeId: 1,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    step: 3,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/food-example.jpg',
                    recipeId: 1,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    step: 4,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/food-example.jpg',
                    recipeId: 1,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    step: 5,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: '',
                    recipeId: 1,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    step: 1,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/food-example.jpg',
                    recipeId: 2,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    step: 2,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/food-example.jpg',
                    recipeId: 2,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    step: 3,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/food-example.jpg',
                    recipeId: 2,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    step: 4,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/food-example.jpg',
                    recipeId: 2,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    step: 5,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/food-example.jpg',
                    recipeId: 2,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    step: 1,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/food-example.jpg',
                    recipeId: 3,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    step: 2,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/food-example.jpg',
                    recipeId: 3,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    step: 3,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/food-example.jpg',
                    recipeId: 3,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    step: 4,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/food-example.jpg',
                    recipeId: 3,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    step: 5,
                    content: '후라이팬에 고기와 소스를 넣고 5분간 볶습니다.',
                    stepImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/food-example.jpg',
                    recipeId: 3,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('cookingSteps', null, {});
    },
};
