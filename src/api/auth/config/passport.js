const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
import config from '../../../config/config';
const { tokenTypes } = require('./tokens');
import  UserModel  from './../models/users.model';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await UserModel.findByPk(payload.sub);
    // const user =null;
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};