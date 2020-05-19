const error=require("./genericErrors");
const CustomExceptions=require("./exceptionModel");

class ResourceNotFound extends CustomExceptions {

    constructor(message, responseCode, payload) {
        super(message, error.notFound, responseCode, payload);
        this.name = 'ResourceNotFoundError';
        this.stack = `${this.message}\n${new Error().stack}`;
    }
}

class ServerError extends CustomExceptions {
    constructor(message, responseCode, payload) {
        super(message, error.serverError, responseCode, payload);
        this.name = 'ServerError';
        this.stack = `${this.message}\n${new Error().stack}`;
    }
}

module.exports={ResourceNotFound,ServerError};