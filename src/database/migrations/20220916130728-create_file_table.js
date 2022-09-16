'use strict';
import FileModel from "../../api/files/model/files.model"
import BaseModel from "../../api/common/models/baseModel";
const model = FileModel 
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
