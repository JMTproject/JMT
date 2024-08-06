'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'cookingTools',
            [
                {
                    toolName: '후라이팬',
                    recipeId: 1,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    toolName: '전자렌지',
                    recipeId: 1,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    toolName: '에어프라이기',
                    recipeId: 1,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    toolName: '에어프라이기',
                    recipeId: 1,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    toolName: '에어프라이기',
                    recipeId: 1,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    toolName: '후라이팬',
                    recipeId: 2,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    toolName: '전자렌지',
                    recipeId: 2,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    toolName: '에어프라이기',
                    recipeId: 2,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    toolName: '후라이팬',
                    recipeId: 3,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    toolName: '전자렌지',
                    recipeId: 3,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
                {
                    toolName: '에어프라이기',
                    recipeId: 3,
                    createdAt: '2024-07-24 20:56:57',
                    updatedAt: '2024-07-24 20:56:57',
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('cookingTools', null, {});
    },
};
