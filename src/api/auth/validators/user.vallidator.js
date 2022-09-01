import { notFound } from '@hapi/boom';
import Joi from 'joi';
import { localeKeys } from '../../../utils/localization/localeKeys.util';
import { localization } from '../../../utils/localization/localization.util';

import validate from '../../../utils/validate.utils';
import  UserService from '../services/user.service';

// Validation schema
const schema = Joi.object({
  email: Joi.string()
    .label('email')
    .email({ minDomainSegments: 2, tlds: { }}),
    firstName: Joi.string()
    .label('firstName')
    .max(90),
    lastName: Joi.string()
    .label('lastName')
    .max(90),
//   mobile_no: Joi.string()
//     .label('mobile')
//     .max(90).required(false),
  password: Joi.string()
    .label('password')
    .max(90)
    .pattern(/^[a-zA-Z0-9]{3,30}$/),
//   password2: Joi.ref('password').required(false),
});

/**
 * Validate create/update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function userValidator(req, res, next) {
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
function findUser(req, res, next) {
  return new UserService()
    .fetchById(req.params.id)
    .then((user) => {
      if(!user){
        next(notFound(localization(localeKeys.USER_NOT_FOUND))) 
      }else if (user instanceof Error){
        next(user)
      }else{
        next()
      }
    })
    .catch(err => next(err));
}

export { findUser, userValidator };