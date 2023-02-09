const string_ = require('../helpers/string');

function literal(resource) {
const resourceSingular = string_.singularizer(resource);
const resourceDenormalized = string_.denormalizer(resource);

  return `
  import { notFound } from '@hapi/boom';
import Joi from 'joi';
import { localeKeys } from '../../../utils/localization/localeKeys.util';
import { localization } from '../../../utils/localization/localization.util';

import validate from '../../../utils/validate.utils';
import ${resourceDenormalized}Service from '../services/${resourceSingular}.service';

// Validation schema
const schema = Joi.object({
  name: Joi.string()
    .label('name')
    .max(50)
    .required(),
});

/**
 * Validate create/update ${resourceSingular} request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function ${resourceSingular}Validator(req, res, next) {
  return validate(req.body, schema)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate ${resourceSingular} existence.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
function find${resourceDenormalized}(req, res, next) {
  return new ${resourceDenormalized}Service()
    .fetchById(req.params.id)
    .then((data) => {
      if(!data){
        next(notFound(localization(localeKeys.DATA_NOT_FOUND))) 
      }else if (data instanceof Error){
        next(data)
      }else{
        next()
      }
    })
    .catch(err => next(err));
}

export { ${resourceSingular}Validator, find${resourceDenormalized} };

`;
}

module.exports = literal