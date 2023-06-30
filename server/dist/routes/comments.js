"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../models/index");
const commentRouter = express_1.default.Router();
commentRouter.get('/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield index_1.Comment.findAll({
            include: [{ model: index_1.User, as: 'User' }],
        });
        res.json(comments);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
commentRouter.post('/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield index_1.Comment.create(req.body);
        res.status(201).json(comment);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = commentRouter;
