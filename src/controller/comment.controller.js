import BaseController from "./base.controller.js";
import CommentService from "../service/comment.service.js";

class CommentController extends BaseController {
  constructor() {
    super(new CommentService());
  }

  // add comment body include user id, book id, rating, comment
  async addComment(req, res, next) {
    try {
      const userId = req.user._id;
      const { bookId, rating, comment } = req.body;
      const result = await this.service.addComment(
        userId,
        bookId,
        rating,
        comment
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const comments = await this.service.getAllComments();
      res.json(comments);
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const commentId = req.params.id;
      const userId = req.user._id; // Assuming req.user._id contains the user ID
  
      const comment = await this.service.getById(commentId);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      if (comment.author.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized to delete this comment" });
      }
  
      const result = await this.service.deleteComment(commentId);
    res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateComment(req, res, next) {
    try {
      const commentId = req.params.id;
      const userId = req.user._id; // Assuming req.user._id contains the user ID
      const updateData = req.body; // Assuming updateData contains fields to update
  
      // Retrieve the comment to check if the user is the author
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      if (comment.author.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized to update this comment" });
      }
  
      // Update the comment
      const updatedComment = await Comment.findByIdAndUpdate(commentId, updateData, { new: true });
      res.json(updatedComment);
    } catch (error) {
      next(error);
    }
  }
}

export default CommentController;
