import { notFound } from '@hapi/boom';
import Joi from 'joi';
import { localeKeys } from '../../../utils/localization/localeKeys.util';
import { localization } from '../../../utils/localization/localization.util';

import validate from '../../../utils/validate.utils';
import  FilesService from '../services/files.service';

// Validation schema
const schema = Joi.object({
  // mimeType: Joi.string()
  //   .label('mimeType')
  //   .max(90)
  //   .required(),
});

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function fileValidator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function findFiles(req, res, next) {
  return new FilesService()
    .fetchById(req.params.id)
    .then((data) => {
      if(!data){
        next(notFound(localization(localeKeys.USER_NOT_FOUND))) 
      }else if (data instanceof Error){
        next(data)
      }else{
        next()
      }
    })
    .catch(err => next(err));
}

export { fileValidator, findFiles };