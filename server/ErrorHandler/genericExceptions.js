const error=require("./genericErrors");
const CustomExceptionTemplate=require("./exceptionModel");

class ResourceNotFound extends CustomExceptionTemplate {

    constructor(message, responseCode, payload) {
        super(message, error.notFound, responseCode, payload);
        this.name = 'ResourceNotFoundError';
        this.stack = `${this.message}\n${new Error().stack}`;
    }
}

module.exports={ResourceNotFound};