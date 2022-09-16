'use strict';
import UserModel from '../../api/auth/models/users.model'
import BaseModel from '../../api/common/models/baseModel'
const model = UserModel 
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(model.tableName,{
      ...model.structure,
      ...BaseModel.commonPropsForMigration()
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(model.tableName);
  }
};
