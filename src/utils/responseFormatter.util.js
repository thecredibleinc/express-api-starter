import HttpStatus from 'http-status-codes';


class ResponseFormatter{


/**
 * format response as per status sent.
 * Defaults to HttpStatus.OK (success)
 *
 * @param   {Error} err
 * @returns {Object}
 */
 static format(dataValue,status=HttpStatus.OK) {
    return {
        code: status,
        message: HttpStatus.getStatusText(status),
        data: dataValue
    }
}


}
export default ResponseFormatter;
