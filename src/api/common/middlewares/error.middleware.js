import HttpStatus from 'http-status-codes';
import buildError from '../../../utils/build_error.util';
import logger from '../../../utils/logger.util';
import ResponseFormatter from '../../../utils/responseFormatter.util';

/**
 * Error response middleware for 404 not found.
 *
 * @param {Object} req
 * @param {Object} res
 */
export function notFound(req, res) {
  // console.log(res)
  res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
      error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
      data:{}
  });
}

/**
 * Method not allowed error middleware. This middleware should be placed at
 * the very bottom of the middleware stack.
 *
 * @param {Object} req
 * @param {Object} res
 */
export function methodNotAllowed(req, res) {
  res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
      code: HttpStatus.METHOD_NOT_ALLOWED,
      message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
      error: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
      data:{}
  });
}

/**
 * To handle errors from body parser for cases such as invalid JSON sent through
 * the body (https://github.com/expressjs/body-parser#errors).
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
export const bodyParser = async (err, req, res, next) => {
  await logIt(constents.log_levels.list.ERROR, `${err.message}: ${err}`, req, res);

  res.status(err.status).json({
      code: err.status,
      message: HttpStatus.getStatusText(err.status),
      error: HttpStatus.getStatusText(err.status),
      data:{}
  });
}

/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
export const genericErrorHandler = async (err, req, res, next) => {
  await logger.error(`${err.message}: ${err}`, req, res);
  const error = buildError(err);
  res.status(error.code).send(ResponseFormatter.format(err,err.code))
}
