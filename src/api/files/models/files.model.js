import {DataTypes} from 'sequelize'
import BaseModel from '../../common/models/baseModel';
class FileModel extends BaseModel{
  static tableName = "files"
  static fileLocations = {
    defaultValue : "local",
    supportedFileLocations:[
      "local",
      "remote"
    ]
  }
  static fileTypes = {
    defaultMimeType : "text/plain",
    supportedMimeTypes:[
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/svg',
      'video/mp3',
      'audiio/mp4',
      'application/pdf',
    ],
    allMimeTypes :[	 
      'x-world/x-3dmf',
      'x-world/x-3dmf',
      'video/x-msvideo',
      'application/postscript',
      'application/octet-stream',
      'application/x-macbinary',
      'image/bmp',
      'application/x-shockwave-flash',
      'text/plain',
      'text/plain',
      'application/java',
      'text/css',
      'text/comma-separated-values',
      'application/cdr',
      'application/msword',
      'application/msword',
      'application/msword',
      'application/acad',
      'application/postscript',
      'application/octet-stream',
      'image/gif',
      'application/gzip',
      'application/x-gtar',
      'video/x-flv',
      'image/x-freehand',
      'image/x-freehand',
      'image/x-freehand',
      'application/x-helpfile',
      'application/x-helpfile',
      'text/html',
      'text/html',
      'image/x-icon',
      'application/x-httpd-imap',
      'application/inf',
      'image/jpeg',
      'image/jpeg',
      'image/jpeg',
      'application/x-javascript',
      'text/x-java-source',
      'application/x-latex',
      'text/plain',
      'audio/x-mpequrl',
      'audio/midi',
      'audio/midi',
      'video/quicktime',
      'audio/mpeg',
      'video/mpeg',
      'video/mpeg',
      'video/mpeg',
      'application/ogg',
      'application/x-httpd-php',
      'application/x-httpd-php',
      'application/pdf',
      'application/pgp',
      'image/png',
      'application/mspowerpoint',
      'application/mspowerpoint',
      'application/mspowerpoint',
      'application/mspowerpoint',
      'application/postscript',
      'video/quicktime',
      'x-world/x-3dmf',
      'x-world/x-3dmf',
      'application/x-quark-express',
      'application/x-rar-compressed',
      'audio/x-realaudio',
      'audio/x-pn-realaudio',
      'audio/x-pn-realaudio',
      'text/rtf',
      'application/x-sprite',
      'application/x-sprite',
      'audio/x-qt-stream',
      'application/x-shockwave-flash',
      'text/xml-svg',
      'text/x-sgml',
      'text/x-sgml',
      'application/x-tar',
      'image/tiff',
      'image/tiff',
      'application/x-compressed',
      'application/x-tex',
      'text/plain',
      'video/x-mpg',
      'audio/x-wav',
      'model/vrml',
      'x-world/x-vrml',
      'application/msexcel',
      'application/msexcel',
      'application/vnd.ms-excel',
      'application/vnd.ms-excel',
      'text/xml',
      'application/x-zip-compressed',
      'application/zip'
]}
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
    desc: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mimeType: {
        type: DataTypes.ENUM(FileModel.fileTypes.supportedMimeTypes),
        defaultValue: FileModel.fileTypes.defaultMimeType
    },
    location:{
      type: DataTypes.ENUM(FileModel.fileLocations.supportedFileLocations),
      defaultValue: FileModel.fileLocations.defaultValue
    }
  }
}

FileModel.init(FileModel.structure, {
    // Other model options go here
    ...BaseModel.commonTableAttrs(),
    tableName: FileModel.tableName,
  }
  );


export default FileModel;