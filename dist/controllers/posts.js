"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getUserPosts = exports.getPost = void 0;
const http_status_codes_1 = require("http-status-codes");
const client_1 = require("@prisma/client");
const validation_1 = require("../middlewares/validation");
const prisma = new client_1.PrismaClient();
const getPost = async (req, res) => {
    const id = req.params.id;
    const post = await prisma.post.findUnique({ where: { id } });
    res.status(http_status_codes_1.StatusCodes.OK).json({ post });
};
exports.getPost = getPost;
const getUserPosts = async (req, res) => {
    (0, validation_1.validate)(req, res);
    const { userId } = req.body;
    const posts = await prisma.post.findMany({ where: { userId } });
    res.status(http_status_codes_1.StatusCodes.OK).json({ posts });
};
exports.getUserPosts = getUserPosts;
const createPost = async (req, res) => {
    (0, validation_1.validate)(req, res);
    const { title, content, userId } = req.body;
    const post = await prisma.post.create({ data: { title, content, userId } });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ post });
};
exports.createPost = createPost;
const updatePost = async (req, res) => {
    (0, validation_1.validate)(req, res);
    const id = req.params.id;
    const { title, content } = req.body;
    const post = await prisma.post.update({ where: { id }, data: { title, content } });
    res.status(http_status_codes_1.StatusCodes.OK).json({ post });
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    const id = req.params.id;
    const post = await prisma.post.delete({ where: { id } });
    res.status(http_status_codes_1.StatusCodes.OK).send();
};
exports.deletePost = deletePost;
//# sourceMappingURL=posts.js.map