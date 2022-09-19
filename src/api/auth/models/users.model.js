import {DataTypes} from 'sequelize'

import bcrypt from 'bcrypt'
import BaseModel from '../../common/models/baseModel';
class UserModel extends BaseModel{
  static tableName = "users"
  static structure = {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    email: { //TODO:encrypt
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    mobile: {//TODO:encrypt
      type: DataTypes.STRING,
      allowNull:true
      // allowNull defaults to true
    },
    profilePhoto: {
      type: DataTypes.STRING,
      allowNull:true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue:"MALE"
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // select: false
    },
    role: {
        type: DataTypes.ENUM(['admin','user','staff']),
        defaultValue: 'admin'
    },
  }
}

UserModel.init(UserModel.structure, {
    // Other model options go here
    ...BaseModel.commonTableAttrs(),
    tableName: UserModel.tableName,
    hooks: {
      beforeCreate: async (user) => {
          if (user.password) {
              user.password = await bcrypt.hashSync(user.password, process.env.SALT || baseConfig.SALT);
          }
      },
      beforeUpdate: async (user) => {
          if (user.password) {
              user.password = await bcrypt.hashSync(user.password, process.env.SALT || baseConfig.SALT);
          }
      }
  }
  });


  export default UserModel