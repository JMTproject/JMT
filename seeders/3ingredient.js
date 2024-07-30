'use strict';


module.exports = {
    async up(queryInterface, Sequelize) {


        await queryInterface.bulkInsert('ingredients', [
            {
                ingredientName: '당근',
                quantity: '1개',
                recipeId: 1,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                ingredientName: '감자',
                quantity: '1개',
                recipeId: 1,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                ingredientName: '소금',
                quantity: '2큰술',
                recipeId: 1,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                ingredientName: '당근',
                quantity: '1개',
                recipeId: 2,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                ingredientName: '감자',
                quantity: '1개',
                recipeId: 2,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                ingredientName: '소금',
                quantity: '2큰술',
                recipeId: 2,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                ingredientName: '당근',
                quantity: '1개',
                recipeId: 3,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                ingredientName: '감자',
                quantity: '1개',
                recipeId: 3,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },
            {
                ingredientName: '소금',
                quantity: '2큰술',
                recipeId: 3,
                createdAt: "2024-07-24 20:56:57",
                updatedAt: "2024-07-24 20:56:57",
            },

        ], {});

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.bulkDelete('ingredients', null, {});

    }
};
