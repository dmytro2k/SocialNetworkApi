"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { UnauthenticatedError } from '../errors'
// import { Request, Response, NextFunction } from 'express'
dotenv_1.default.config();
const createJWT = (id, name) => {
    return jsonwebtoken_1.default.sign({ id, name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
exports.createJWT = createJWT;
// export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     throw new UnauthenticatedError('Invalid Authentication')
//   }
//   const token = authHeader.split(' ')[1]
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET!);
//     next()
//   } catch (error) {
//     throw new UnauthenticatedError('Invalid Authentication')
//   }
// }
//# sourceMappingURL=authentication.js.map