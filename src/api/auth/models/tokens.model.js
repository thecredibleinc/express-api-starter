import {Model,DataTypes} from 'sequelize'
import database from '../../../utils/dbconnection.util'
import BaseModel from '../../common/models/baseModel'
import { tokenTypes } from '../config/tokens'
import UserModel from './users.model'

class TokenModel extends Model{
  static tableName = "tokens"
  static structure = {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id:{
        type: DataTypes.INTEGER,
        references:UserModel,
        allowNull:false
      },
      type: {
        type: DataTypes.STRING,
        enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL],
        defaultValue:tokenTypes.REFRESH,
        allowNull: false,
      },
      expires: {
      type: DataTypes.DATE,
      allowNull: false,
      },
      blacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      }
  }
}

TokenModel.init(TokenModel.structure,{
    ...BaseModel.commonTableAttrs(),
    tableName:TokenModel.tableName,
    
})

export default TokenModel