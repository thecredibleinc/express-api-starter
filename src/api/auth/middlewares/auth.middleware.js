import passport from 'passport';

const { roleRights,allActionsWithLevel,allRoles } = require('../config/roles');
import {unauthorized,forbidden,badImplementation} from '@hapi/boom'
import  { localization } from '../../../utils/localization/localization.util';
import { localeKeys } from '../../../utils/localization/localeKeys.util';

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(unauthorized(localization(localeKeys.AUTHORIZATION_FAILURE)));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRoleLevel = allRoles[user.role]
    const requiredActionLevel = allActionsWithLevel[requiredRights];
    if(!requiredActionLevel){
      reject(badImplementation(localization(localeKeys.AUTH_MIDDLEWARE_INVALID_ACTION)));
    }
    // const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    const hasRequiredRights =  userRoleLevel <= requiredActionLevel
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(forbidden(localization(localeKeys.FORBIDDEN)));
    }
  }

  resolve();
};

export const authMiddleware = (...requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

