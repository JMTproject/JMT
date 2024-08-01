'use strict';


module.exports = {
    async up(queryInterface, Sequelize) {


        await queryInterface.bulkInsert('recipes', [
            {
                recipeId: 1,
                recipeTitle: '초간단 제육볶음 레시피',
                description: '요리소개글입니다....요리소개글입니다....요리소개글입니다....',
                mainImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
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
                mainImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
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
                mainImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
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
