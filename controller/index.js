const main = (req, res) => {
    res.render('index');
};
const login = (req, res) => {
    res.render('login');
};
const signup = (req, res) => {
    res.render('signup');
};

const profile = (req, res) => {
    res.render('profile');
};

const recipe = (req, res) => {
    res.render('recipe');
};

const writeRecipe = (req, res) => {
    res.render('writeRecipe');
};

const updateRecipe = (req, res) => {
    res.render('updateRecipe');
};
module.exports = { main, login, signup, profile, recipe, writeRecipe, updateRecipe };
