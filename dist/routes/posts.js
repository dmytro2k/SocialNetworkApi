"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = require("../controllers/posts");
const express_validator_1 = require("express-validator");
const createPostVal = [
    (0, express_validator_1.body)('title').notEmpty().isString(),
    (0, express_validator_1.body)('content').notEmpty().isString(),
    (0, express_validator_1.body)('userId').notEmpty().isString(),
];
const updatePostVal = [
    (0, express_validator_1.body)('title').notEmpty().isString(),
    (0, express_validator_1.body)('content').notEmpty().isString()
];
const postVal = [
    (0, express_validator_1.body)('userId').notEmpty().isString(),
];
const router = express_1.default.Router();
router.route('/').get(postVal, posts_1.getUserPosts).post(createPostVal, posts_1.createPost);
router.route('/:id').get(posts_1.getPost).patch(updatePostVal, posts_1.updatePost).delete(posts_1.deletePost);
exports.default = router;
//# sourceMappingURL=posts.js.map