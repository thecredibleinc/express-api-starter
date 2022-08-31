import HttpStatus from 'http-status-codes';


class ResponseFormatter{


/**
 * format response as per status sent.
 * Defaults to HttpStatus.OK (success)
 *
 * @param   {Error} err
 * @returns {Object}
 */
 static format(dataValue,status=HttpStatus.OK,arg_msg=null) {
    var msgToDisplay = HttpStatus.getStatusText(status)
    if(arg_msg){
        msgToDisplay = arg_msg;
    }
    return {
        code: status,
        message: msgToDisplay,
        data: dataValue
    }
}

/**
 * format response as per status sent.
 * Defaults to HttpStatus.OK (success)
 *
 * @param   {Error} err
 * @returns {Object}
 */
 static formatError(err,status=HttpStatus.OK,arg_msg=null) {
    var msgToDisplay = HttpStatus.getStatusText(status)
    if(arg_msg){
        msgToDisplay = arg_msg;
    }
    return {
        code: status,
        message: msgToDisplay,
        data: dataValue
    }
}


}
export default ResponseFormatter;
