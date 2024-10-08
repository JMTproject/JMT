const { Recipe, CookingStep, CookingTools, Ingredient, Review, User } = require('../models');

exports.getRecipePage = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const userId = req.userInfo ? req.userInfo.userId : null;
        const recipe = await Recipe.findByPk(recipeId);
        const cookingSteps = await CookingStep.findAll({ where: { recipeId } });
        const cookingTools = await CookingTools.findAll({ where: { recipeId } });
        const ingredients = await Ingredient.findAll({ where: { recipeId } });
        const reviews = await Review.findAll({
            where: { recipeId, isEnabled: true },
            include: [
                {
                    model: User,
                    attributes: ['nickName', 'profileImg', 'aboutMe', 'email'],
                },
            ],
        });

        const user = await User.findByPk(recipe.userId);

        let sumRating = 0;
        reviews.forEach((review) => {
            sumRating += review.rating;
        });
        const averageRating = sumRating / reviews.length;

        res.json({
            recipe,
            cookingSteps,
            cookingTools,
            ingredients,
            reviews,
            user,
            averageRating,
            userId,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
