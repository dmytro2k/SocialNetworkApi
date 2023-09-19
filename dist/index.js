"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const dotenv_1 = __importDefault(require("dotenv"));
const notFound_1 = require("./middlewares/notFound");
const errorHandler_1 = require("./middlewares/errorHandler");
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1/auth', auth_1.default);
app.use(notFound_1.notFoundMiddleware);
app.use(errorHandler_1.errorHandlerMiddleware);
const port = process.env.PORT || 4000;
const start = async () => {
    try {
        // const users = await prisma.user.findMany()
        // console.log(users)
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=index.js.map