"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
class CustomError extends Error {
}
const createError = (status, message) => {
    const err = new CustomError();
    err.status = status;
    err.message = message;
    return err;
};
exports.createError = createError;
