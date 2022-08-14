import {Model} from 'sequelize'
import db from './../../utils/dbconnection.util';
class UsersModel extends Model{

}

UsersModel.init({
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
    db, // We need to pass the connection instance
    tableName: 'users',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
  });


  export default UsersModel