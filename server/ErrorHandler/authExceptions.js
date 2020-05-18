const error=require('./authErrors');
const CustomExceptionTemplate=require("./exceptionModel");


class invalidTokenGrantCodeError extends CustomExceptionTemplate{
    constructor(message,responseCode,payload){
    super(message,error.invalidTokenGrantCode,responseCode,payload);
    this.name="InvalidTokenGrantCodeError";
    this.stack=`${this.message}\n${new Error().stack}`
    }
}
class invalidRefreshTokenError extends CustomExceptionTemplate{
    constructor(message,responseCode,payload){
    super(message,error.invalidRefreshTokenError,responseCode,payload);
    this.name="InvalidRefreshTokenError";
    this.stack=`${this.message}\n${new Error().stack}`
    }
}

class invalidTokenError extends CustomExceptionTemplate{
    constructor(message,responseCode,payload){
        super(message,error.invalidTokenError,responseCode,payload);
        this.name="InvalidTokenError";
        this.stack=`${this.message}\n${new Error().stack}`
        }
}
 
module.exports={invalidTokenGrantCodeError,invalidRefreshTokenError,invalidTokenError};