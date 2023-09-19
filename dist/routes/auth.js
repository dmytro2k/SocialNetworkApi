"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const registerValidateReq = [
    (0, express_validator_1.body)('name').notEmpty().isString(),
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').notEmpty().isString(),
];
const loginValidateReq = [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').notEmpty().isString(),
];
router.route('/register').post(registerValidateReq, auth_1.register);
router.route('/login').post(loginValidateReq, auth_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map