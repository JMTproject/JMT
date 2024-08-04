const { User, Recipe, Review, Ingredient, CookingTools, CookingStep } = require('../models');


const recipeList = async (req, res) => {
  try {
    // 권한 확인
    if(!req.userInfo){
      res.json({result:false, message:'로그인 오류'})
      return;
    }
    // 관리자 권한 확인
    const {email} = req.userInfo
    if(email !== 'admin@admin.com'){
      res.json({result:false, message:'관리자 권한 없음'})
      return;
    }
    

    const allRecipe = await Recipe.findAll({where: {isEnabled: true},
            order: [
        ['createdAt', 'DESC'], // createdAt을 기준으로 내림차순 정렬
      ],
      
    });

    // 리뷰수 만드는 함수
    await Promise.all(
      allRecipe.map(async (recipe) => {
        const reviews = await Review.findAll({ where: { recipeId: recipe.recipeId } });
        recipe.dataValues.reviewCount = `${reviews.length}`;
        recipe._previousDataValues.reviewCount = `${reviews.length}`;
      })
    );

    res.json({ result: true, allRecipe });
  } catch (error) {
    res.status(500).json({ result: false });
  }
};



const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.body.id;
    const result = await Recipe.update({ isEnabled: false }, { where: { recipeId } });
    if (result) {
      res.json({ result: true, message: '레시피 삭제 성공' });
    } else {
      res.json({ result: false, message: '레시피 삭제 실패' });
    }
  } catch (error) {
    res.status(500).json({ result: false });
  }
};

const adminUL = async (req, res) => {
  try {
    // 권한 확인
    if(!req.userInfo){
      res.json({result:false, message:'로그인 오류'})
      return;
    }
    // 관리자 권한 확인
    const {email} = req.userInfo
    if(email !== 'admin@admin.com'){
      res.json({result:false, message:'관리자 권한 없음'})
      return;
    }
    
    const userList = await User.findAll({
      order: [
        ['createdAt', 'DESC'], // createdAt을 기준으로 내림차순 정렬
      ],
    });

    // console.log('콘솔확인!!', userList);
    

    res.json({result:true, userList});

  } catch (error) {
    res.status(500).json({ result: false });
  }
};

const deleteUser = async (req, res) => {
    try {
      const userId = req.body.id;
      const result = await User.update({ isEnabled: false }, { where: { userId } });
      if (result) {
        res.json({ result: true, message: '회원 계정 삭제 성공' });
      } else {
        res.json({ result: false, message: '회원 계정 삭제 실패' });
      }
    } catch (error) {
      res.status(500).json({ result: false });
    }
  };

module.exports = { deleteRecipe, adminUL, deleteUser, recipeList };
