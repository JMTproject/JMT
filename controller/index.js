// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const {} = require('../models');

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

const recipe = ( req,res ) =>{
    res.render('recipe');
}

const writeRecipe = ( req, res) =>{
    res.render('writeRecipe');
}

module.exports = { main, login, signup, profile, recipe, writeRecipe };