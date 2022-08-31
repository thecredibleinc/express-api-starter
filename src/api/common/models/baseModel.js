import db from '../../../utils/dbconnection.util'
import { Model } from 'sequelize';
/**
 * Base model.
 */
class BaseModel extends Model{
  
  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }
  

  static commonTableAttrs(){
    return {
    sequelize:db, // We need to pass the connection instance
    timestamps: true,
    paranoid: true,
    underscored: true,
    // If you want to give a custom name to the deletedAt column
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    }
  }

  /**
   * 
   */
  static hidden(){
    return ['password','deleted_at'];
  }

  get soft(){
    return ['deleted_at'];
  }

  initialize() {
    // this.on('saving', (model, attrs, options) => {
    //   // This is fired before a model insert ot update is called 
    // });
  }

}

export default BaseModel;
