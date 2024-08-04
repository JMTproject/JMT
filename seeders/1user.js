'use strict';
const bcrypt = require('bcrypt');
const password = '1234';




module.exports = {
  async up(queryInterface, Sequelize) {
    
    let bcryptPass = '';
    bcryptPass = await bcrypt.hash(password, 10)
    console.log('콘솔확인@',bcryptPass);
    
    await queryInterface.bulkInsert('users', [
      {
        userId: 1,
        email: 'admin@admin.com',
        password: bcryptPass,
        nickname: 'ㅎㅎㅎ',
        profileImg: "https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/profileDeafultImg.png",
        aboutMe: "",
        isEnabled: true,
        createdAt: "2024-07-24 20:56:57",
        updatedAt: "2024-07-24 20:56:57",
      },
      {
        userId: 2,
        email: 'asdf1@asdf.com',
        password: bcryptPass,
        nickname: 'ㅎㅎㅎ1',
        profileImg: "https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/profileDeafultImg.png",
        aboutMe: "",
        isEnabled: true,
        createdAt: "2024-07-24 20:56:57",
        updatedAt: "2024-07-24 20:56:57",
      },
      {
        userId: 3,
        email: 'asdf2@asdf.com',
        password: bcryptPass,
        nickname: 'ㅎㅎㅎ2',
        profileImg: "https://kdt13-hyun1.s3.ap-northeast-2.amazonaws.com/profileDeafultImg.png",
        aboutMe: "",
        isEnabled: true,
        createdAt: "2024-07-24 20:56:57",
        updatedAt: "2024-07-24 20:56:57",
      },

    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
