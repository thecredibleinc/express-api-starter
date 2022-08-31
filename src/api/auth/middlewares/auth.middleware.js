import passport from 'passport';

const { roleRights,allActions,allRoles } = require('../config/roles');
import {unauthorized,forbidden,badImplementation} from '@hapi/boom'

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(unauthorized("Authentication Failure"));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRoleLevel = allRoles[user.role]
    const requiredActionLevel = allActions[requiredRights];
    if(!requiredActionLevel){
      reject(badImplementation("Wrong Required Action passed.. contact support"));
    }
    // const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    const hasRequiredRights =  userRoleLevel <= requiredActionLevel
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(forbidden("Forbidden"));
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

