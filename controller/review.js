const { Recipe, Review, User } = require('../models');

exports.getAllReviews = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findByPk(recipeId);
        const reviews = await Review.findAll({ where: { recipeId } });
        const user = await User.findByPk(recipe.userId);

        res.json({
            recipe,
            reviews,
            user,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
