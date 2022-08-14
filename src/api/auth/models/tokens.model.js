import {Model,DataTypes} from 'sequelize'
import database from '../../../utils/dbconnection.util'
import { tokenTypes } from '../config/tokens'
import UserModel from './users.model'

class TokenModel extends Model{

}

TokenModel.init({
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
      },

},{
    sequelize:database,
    tableName:"tokens",
    timestamps:true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        deletedAt: 'deleted_at'
})

export default TokenModel