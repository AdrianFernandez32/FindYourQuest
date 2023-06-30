import express from 'express';
import { Comment, User } from '../models/index';

const commentRouter = express.Router();

commentRouter.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [{ model: User, as: 'User' }],
    });
    res.json(comments);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

commentRouter.post('/', async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default commentRouter;
