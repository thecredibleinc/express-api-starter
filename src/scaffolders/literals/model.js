const string_ = require('../helpers/string');

function literal(resource) {
const resourceSingular = string_.singularizer(resource);
const resourceNormalizedSnakeCase = string_.normalizer_snakecase(resource);
const resourceDenormalized = string_.denormalizer(resource);

  return `
  import {DataTypes} from 'sequelize'
  import BaseModel from '../../common/models/baseModel';
  class ${resourceDenormalized}Model extends BaseModel{
    static tableName = "${resource}"
    static structure = {
      // Model attributes are defined here
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull:true,
      },
    }
  }
  
  ${resourceDenormalized}Model.init(${resourceDenormalized}Model.structure, {
      // Other model options go here
      ...BaseModel.commonTableAttrs(),
      tableName: ${resourceDenormalized}Model.tableName,
    }
    );
  //TODO:call associate method is any association is defined  
  
  export default ${resourceDenormalized}Model;


  
`;
}

module.exports = literal