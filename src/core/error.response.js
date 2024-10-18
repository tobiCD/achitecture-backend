const StatusCode = {
    FORBIDDEN: 403, // Sửa chính tả 'FORBIDENT' thành 'FORBIDDEN'
    CONFLICT: 409
}

const ReasonStatusCode = {
    FORBIDDEN: 'BAD REQUEST ERROR', // Sửa chính tả 'FORBIDENT' thành 'FORBIDDEN'
    CONFLICT: 'CONFLICT ERROR'
}

// Class lỗi cơ bản
class ErrorCode extends Error {
    constructor(message, status) {
        super(message); // Gọi constructor của Error và truyền message
        this.status = status; // Gán status vào đối tượng
        Error.captureStackTrace(this, this.constructor); // Giữ stack trace
    }
}

// Class lỗi Conflict
class ConflictRequestError extends ErrorCode {
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode); // Truyền message và status code lên lớp cha
    }
}

// Class lỗi Bad Request
class BadRequestError extends ErrorCode {
    constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode); // Truyền message và status code lên lớp cha
    }
}

module.exports = { BadRequestError, ConflictRequestError };
