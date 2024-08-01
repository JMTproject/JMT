'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert('users', [
      {
        userId: 1,
        email: 'asdf@asdf.com',
        password: '1234',
        nickname: 'ㅎㅎㅎ',
        profileImg: "../images/profileDeafultImg.png",
        aboutMe: "",
        isEnabled: true,
        createdAt: "2024-07-24 20:56:57",
        updatedAt: "2024-07-24 20:56:57",
      },
      {
        userId: 2,
        email: 'asdf1@asdf.com',
        password: '1234',
        nickname: 'ㅎㅎㅎ1',
        profileImg: "../images/profileDeafultImg.png",
        aboutMe: "",
        isEnabled: true,
        createdAt: "2024-07-24 20:56:57",
        updatedAt: "2024-07-24 20:56:57",
      },
      {
        userId: 3,
        email: 'asdf2@asdf.com',
        password: '1234',
        nickname: 'ㅎㅎㅎ2',
        profileImg: "../images/profileDeafultImg.png",
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
