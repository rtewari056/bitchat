// Custom Error Handling by extending Error class
class ErrorResponse extends Error {
    statusCode: number;
    // It will take a "message" and "statusCode"
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
};

export default ErrorResponse;