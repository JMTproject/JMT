'use strict';


module.exports = {
    async up(queryInterface, Sequelize) {


        await queryInterface.bulkInsert('reviews', [
            {
                rating: 4,
                content: '정말 맛있네요!',
                reviewImg: '../images/profileDeafultImg.png',
                userId: 3,
                recipeId: 1,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '해먹어 보니 별론데요?',
                reviewImg: '../images/profileDeafultImg.png',
                userId: 3,
                recipeId: 1,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '굿굿',
                reviewImg: '../images/profileDeafultImg.png',
                userId: 3,
                recipeId: 1,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '정말 맛있네요!',
                reviewImg: '../images/profileDeafultImg.png',
                userId: 3,
                recipeId: 2,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '해먹어 보니 별론데요?',
                reviewImg: '../images/profileDeafultImg.png',
                userId: 3,
                recipeId: 2,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '굿굿',
                reviewImg: '../images/profileDeafultImg.png',
                userId: 3,
                recipeId: 2,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '정말 맛있네요!',
                reviewImg: '../images/profileDeafultImg.png',
                userId: 3,
                recipeId: 3,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '해먹어 보니 별론데요?',
                reviewImg: '../images/profileDeafultImg.png',
                userId: 3,
                recipeId: 3,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                rating: 4,
                content: '굿굿',
                reviewImg: '../images/profileDeafultImg.png',
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
