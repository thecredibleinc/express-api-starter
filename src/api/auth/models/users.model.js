import {Model,DataTypes} from 'sequelize'
import db from '../../../utils/dbconnection.util';
import bcrypt from 'bcrypt'
class UserModel extends Model{

}

UserModel.init({
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
      allowNull:false
    },
    mobile: {//TODO:encrypt
      type: DataTypes.STRING,
      allowNull:true
      // allowNull defaults to true
    },
    profile_photo: {
      type: DataTypes.STRING,
      allowNull:false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // select: false
    },
    role: {
        type: DataTypes.ENUM(['ADMIN','USER','STAFF']),
        defaultValue: 'ADMIN'
    },
  }, {
    // Other model options go here
    sequelize:db, // We need to pass the connection instance
    tableName: 'users',
    timestamps:true,
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    deletedAt: 'deleted_at',
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