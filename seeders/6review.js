'use strict';


module.exports = {
    async up(queryInterface, Sequelize) {


        await queryInterface.bulkInsert('reviews', [
            {
                rating: 4,
                content: '정말 맛있네요!',
                reviewImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
                userId: 3,
                recipeId: 1,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '해먹어 보니 별론데요?',
                reviewImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
                userId: 3,
                recipeId: 1,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '굿굿',
                reviewImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
                userId: 3,
                recipeId: 1,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '정말 맛있네요!',
                reviewImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
                userId: 3,
                recipeId: 2,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '해먹어 보니 별론데요?',
                reviewImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
                userId: 3,
                recipeId: 2,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '굿굿',
                reviewImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
                userId: 3,
                recipeId: 2,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '정말 맛있네요!',
                reviewImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
                userId: 3,
                recipeId: 3,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '해먹어 보니 별론데요?',
                reviewImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
                userId: 3,
                recipeId: 3,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '굿굿',
                reviewImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
                userId: 3,
                recipeId: 3,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },


        ], {});

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.bulkDelete('reviews', null, {});

    }
};
