"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const loginVal = [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').notEmpty().isString(),
];
const registerVal = [
    (0, express_validator_1.body)('name').notEmpty().isString(),
    ...loginVal
];
router.route('/register').post(registerVal, auth_1.register);
router.route('/login').post(loginVal, auth_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map