const string_ = require('../helpers/string');

function literal(resource) {
const resourceSingular = string_.singularizer(resource);
const resourceNormalizedSnakeCase = string_.normalizer_snakecase(resource);
const resourceDenormalized = string_.denormalizer(resource);

  return `
'use strict';
import ${resourceDenormalized}Model from "../../api/${resourceSingular}/models/${resourceSingular}.model"
import BaseModel from "../../api/common/models/baseModel";
const model = ${resourceDenormalized}Model 
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
`;
}

module.exports = literal
