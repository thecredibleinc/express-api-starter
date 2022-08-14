import {Model,DataTypes } from 'sequelize'
import db from './../../../utils/dbconnection.util'

class TempModel extends Model{

}

TempModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
},
{
    // Other model options go here
    sequelize:db, // We need to pass the connection instance
    tableName:'temp',

    timestamps: false,
    // updatedAt: 'updated_at',
    // createdAt: 'created_at',
})

export default TempModel