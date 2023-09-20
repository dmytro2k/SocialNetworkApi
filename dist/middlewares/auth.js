"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserExistence = exports.comparePasswords = exports.hashPassword = void 0;
const errors_1 = require("../errors");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const hashPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(13);
    return await bcryptjs_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
const comparePasswords = async (candidatePassword, password) => {
    const isMatch = await bcryptjs_1.default.compare(candidatePassword, password);
    if (!isMatch) {
        throw new errors_1.BadRequestError('Incorrect password');
    }
};
exports.comparePasswords = comparePasswords;
const checkUserExistence = async (expectation, email) => {
    const userExists = (await prisma.user.findUnique({ where: { email } }))
        ? true
        : false;
    if (!userExists && expectation) {
        throw new errors_1.NotFoundError(`User with email: '${email}' does not exists`);
    }
    if (userExists && !expectation) {
        throw new errors_1.BadRequestError(`User with email: '${email}' already exists`);
    }
};
exports.checkUserExistence = checkUserExistence;
//# sourceMappingURL=auth.js.map