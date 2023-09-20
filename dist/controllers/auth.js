"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const http_status_codes_1 = require("http-status-codes");
const client_1 = require("@prisma/client");
const validation_1 = require("../middlewares/validation");
const authentication_1 = require("../middlewares/authentication");
const auth_1 = require("../middlewares/auth");
const prisma = new client_1.PrismaClient();
const login = async (req, res) => {
    (0, validation_1.validate)(req, res);
    let { email, password } = req.body;
    await (0, auth_1.checkUserExistence)(true, email);
    const user = (await prisma.user.findUnique({ where: { email } }));
    await (0, auth_1.comparePasswords)(password, user.password);
    const jwt = (0, authentication_1.createJWT)(user.id, user.name);
    res.status(http_status_codes_1.StatusCodes.OK).json({ data: { user: { id: user.id, name: user.name }, jwt } });
};
exports.login = login;
const register = async (req, res) => {
    (0, validation_1.validate)(req, res);
    let { name, email, password } = req.body;
    password = await (0, auth_1.hashPassword)(password);
    await (0, auth_1.checkUserExistence)(false, email);
    const user = await prisma.user.create({ data: { name, email, password } });
    const jwt = (0, authentication_1.createJWT)(user.id, user.name);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ data: { user: { id: user.id, name: user.name }, jwt } });
};
exports.register = register;
//# sourceMappingURL=auth.js.map