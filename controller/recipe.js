const { Recipe, CookingStep, CookingTools, Ingredient, Review, User } = require('../models');

exports.getRecipePage = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findByPk(recipeId);
    const cookingSteps = await CookingStep.findAll({ where: { recipeId } });
    const cookingTools = await CookingTools.findAll({ where: { recipeId } });
    const ingredients = await Ingredient.findAll({ where: { recipeId } });
    const reviews = await Review.findAll({
      where: { recipeId },
      include: [
        {
          model: User,
          attributes: ['nickName', 'profileImg'],
        },
      ],
    });
    const user = await User.findByPk(recipe.userId);

    // 리뷰 별점 평균 구하기
    let sumRating = 0;
    reviews.forEach((review) => {
      sumRating += review.rating;
    });
    const averageRating = sumRating / reviews.length;
    console.log(averageRating);

    res.json({
      recipe,
      cookingSteps,
      cookingTools,
      ingredients,
      reviews,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
