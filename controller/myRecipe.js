const { User, Recipe, Review, Ingredient, CookingTools, CookingStep } = require('../models');

const myRecipeList = async (req, res) => {
  try {
    // 권한 확인
    if(!req.userInfo){
        res.json({result:false, message:'로그인 오류'})
        return;
      }
      
    const { userId } = req.userInfo;
    const myRecipe = await Recipe.findAll({
      where: { userId, isEnabled: true },
      order: [
        ['createdAt', 'DESC'], // createdAt을 기준으로 내림차순 정렬
      ],
    });

    // 리뷰수 만드는 함수
    await Promise.all(
      myRecipe.map(async (recipe) => {
        const reviews = await Review.findAll({ where: { recipeId: recipe.recipeId } });
        recipe.dataValues.reviewCount = `${reviews.length}`;
        recipe._previousDataValues.reviewCount = `${reviews.length}`;
      })
    );

    res.json({ result: true, myRecipe });

  } catch (error) {
    res.status(500).json({ result: false });
  }
};

module.exports = { myRecipeList };
