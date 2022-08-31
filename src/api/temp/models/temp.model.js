import {Model,DataTypes } from 'sequelize'
import BaseModel from '../../common/models/baseModel'

class TempModel extends Model{
    static tableName = "temp"
    static structure = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
    }
}

TempModel.init(TempModel.structure,
{
    // Other model options go here
    ...BaseModel.commonTableAttrs(),
    tableName:'temp',
    
})

export default TempModel