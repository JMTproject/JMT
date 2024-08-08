'use strict';
let recipeSeed = [
    {
        recipeId: 1,
        recipeTitle: '초간단 제육볶음 레시피1',
        description: '요리소개글입니다....요리소개글입니다....요리소개글입니다....',
        mainImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
        servings: '2',
        cookingTime: '15',
        rating: 4.1,
        viewCount: 10000,
        isEnabled: true,
        userId: 1,
        createdAt: '2024-07-21 20:56:57',
        updatedAt: '2024-07-24 20:56:57',
    },
    {
        recipeId: 2,
        recipeTitle: '초간단 제육볶음 레시피2',
        description: '요리소개글입니다....요리소개글입니다....요리소개글입니다....',
        mainImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
        servings: '2',
        cookingTime: '15',
        rating: 4.8,
        viewCount: 5,
        isEnabled: true,
        userId: 1,
        createdAt: '2024-07-22 20:56:57',
        updatedAt: '2024-07-24 20:56:57',
    },
    {
        recipeId: 3,
        recipeTitle: '초간단 제육볶음 레시피3',
        description: '요리소개글입니다....요리소개글입니다....요리소개글입니다....',
        mainImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
        servings: '2',
        cookingTime: '15',
        rating: 3.4,
        viewCount: 4,
        isEnabled: true,
        userId: 1,
        createdAt: '2024-07-23 20:56:57',
        updatedAt: '2024-07-24 20:56:57',
    },
    {
        recipeId: 4,
        recipeTitle: '초간단 제육볶음 레시피3',
        description: '요리소개글입니다....요리소개글입니다....요리소개글입니다....',
        mainImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
        servings: '2',
        cookingTime: '15',
        rating: 3.4,
        viewCount: 4,
        isEnabled: false,
        userId: 1,
        createdAt: '2024-07-23 20:56:57',
        updatedAt: '2024-07-24 20:56:57',
    },
    {
        recipeId: 5,
        recipeTitle: '초간단 제육볶음 레시피3',
        description: '요리소개글입니다....요리소개글입니다....요리소개글입니다....',
        mainImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
        servings: '2',
        cookingTime: '15',
        rating: 3.4,
        viewCount: 4,
        isEnabled: false,
        userId: 1,
        createdAt: '2024-07-23 20:56:57',
        updatedAt: '2024-07-24 20:56:57',
    },

    // 추가 데이터

    {
        recipeTitle: '초간단 제육볶음 레시피3',
        description: '요리소개글입니다....요리소개글입니다....요리소개글입니다....',
        mainImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
        servings: '2',
        cookingTime: '15',
        rating: 3.4,
        viewCount: 4,
        isEnabled: false,
        userId: 1,
        createdAt: '2024-07-23 20:56:57',
        updatedAt: '2024-07-24 20:56:57',
    },
];

for (let i = 1; i <= 300; i++) {
    recipeSeed.push({
        recipeTitle: `초간단 제육볶음 레시피${i}`,
        description: '요리소개글입니다....요리소개글입니다....요리소개글입니다....',
        mainImg: 'https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/1721636568075-monkey2.jpg',
        servings: '2',
        cookingTime: '15',
        rating: 3.4,
        viewCount: 4,
        isEnabled: true,
        userId: 2,
        createdAt: '2024-07-23 20:56:57',
        updatedAt: '2024-07-24 20:56:57',
    });
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('recipes', recipeSeed, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('recipes', null, {});
    },
};
