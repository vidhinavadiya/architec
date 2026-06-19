class Response {
    constructor( status, success, message, data = null, error = null ) {
        this.status = status;
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }
};

module.exports = {
    // 200 Success
    successResponse: ( message = 'Success', data = null ) => {
        return new Response(200, true, message, data);
    },

    // 400 Bad Request
    badRequestResponse: ( message = 'Bad Request', data = null ) => {
        return new Response(400, false, message, data);
    },

    // 401 Unauthorized
    unauthorizedResponse: ( message = 'Unauthorized' ) => {
        return new Response(401, false, message);
    },

    // 404 Not Found
    notFoundResponse: ( message = 'Resource not found' ) => {
        return new Response(404, false, message);
    },

    // 500 Server Error
    serverError: ( message = 'Internal Server Error', data = null, error = null ) => {
        return new Response( 500, false, message, data, error);
    }

};