"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.comparePasswords = exports.createJWT = exports.hashPassword = void 0;
const express_validator_1 = require("express-validator");
const errors_1 = require("../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = async (password) => {
    const salt = await bcryptjs_1.default.genSalt(13);
    return await bcryptjs_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
const createJWT = (id, name) => {
    return jsonwebtoken_1.default.sign({ id, name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
exports.createJWT = createJWT;
const comparePasswords = async (candidatePassword, password) => {
    const isMatch = await bcryptjs_1.default.compare(candidatePassword, password);
    if (!isMatch) {
        throw new errors_1.BadRequestError('Incorrect password');
    }
};
exports.comparePasswords = comparePasswords;
const validate = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new errors_1.BadRequestError('Bad request data');
    }
};
exports.validate = validate;
//# sourceMappingURL=auth.js.map