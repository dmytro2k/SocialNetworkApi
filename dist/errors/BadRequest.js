"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("./CustomError"));
const http_status_codes_1 = require("http-status-codes");
class BadRequestError extends CustomError_1.default {
    statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}
exports.default = BadRequestError;
//# sourceMappingURL=BadRequest.js.map