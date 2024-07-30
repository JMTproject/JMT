'use strict';


module.exports = {
    async up(queryInterface, Sequelize) {


        await queryInterface.bulkInsert('recipes', [
            {
                recipeId: 1,
                recipeTitle: '초간단 제육볶음 레시피',
                description: '요리소개글입니다....요리소개글입니다....요리소개글입니다....',
                mainImg: '../images/profileDeafultImg.png',
                servings: "2",
                cookingTime: "15",
                rating: 4.0,
                userId: 1,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                recipeId: 2,
                recipeTitle: '초간단 제육볶음 레시피',
                description: '요리소개글입니다....요리소개글입니다....요리소개글입니다....',
                mainImg: '../images/profileDeafultImg.png',
                servings: "2",
                cookingTime: "15",
                rating: 4.0,
                userId: 1,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                recipeId: 3,
                recipeTitle: '초간단 제육볶음 레시피',
                description: '요리소개글입니다....요리소개글입니다....요리소개글입니다....',
                mainImg: '../images/profileDeafultImg.png',
                servings: "2",
                cookingTime: "15",
                rating: 4.0,
                userId: 1,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
        ], {});

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.bulkDelete('recipes', null, {});

    }
};
