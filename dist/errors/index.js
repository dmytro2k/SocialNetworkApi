"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedError = exports.BadRequestError = exports.NotFoundError = exports.CustomError = void 0;
const CustomError_1 = __importDefault(require("./CustomError"));
exports.CustomError = CustomError_1.default;
const NotFound_1 = __importDefault(require("./NotFound"));
exports.NotFoundError = NotFound_1.default;
const BadRequest_1 = __importDefault(require("./BadRequest"));
exports.BadRequestError = BadRequest_1.default;
const Unauthenticated_1 = __importDefault(require("./Unauthenticated"));
exports.UnauthenticatedError = Unauthenticated_1.default;
//# sourceMappingURL=index.js.map