  // services/userService.js
import BaseService from "./base.service.js";
import Comment from "../Schema/comment.js";
import BookService from "./book.service.js";
import Book from "../Schema/book.js";

class CommentService extends BaseService {
  bookService;

  constructor() {
    super(Comment);
    this.bookService = new BookService();
  }

  // Add custom methods for UserService if needed

  async addComment(userId, bookId, rating, comment) {
    try {
      const book = await this.bookService.getById(bookId);
      console.log(book, "book");
      if (!book) {
        throw new Error(`book ${bookId} not found`);
      }

      // Create and save the comment
      const newComment = new Comment({
        rating,
        comment,
        author: userId,
      });
      await newComment.save();

      // Initialize book.comments as an array if it's not already
      if (!Array.isArray(book.comments)) {
        book.comments = [];
      }

      // Push the comment's ID into the book's comments array
      book.comments.push(newComment._id);

      // Save the book with the new comment reference
      await book.save();

      return book.populate("comments"); // Populate to return detailed comments if needed
    } catch (error) {
      throw new Error(`Error adding comment: ${error.message}`);
    }
  }
  async updateComment(bookId, commentId, rating, comment) {
    try {
      const book = await this.bookService.getById(bookId);
      if (!book) {
        throw new Error(`book ${bookId} not found`);
      }

      // Update the comment
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {
          rating,
          comment,
        },
        { new: true }
      );

      return updatedComment;
    } catch (error) {
      throw new Error(`Error updating comment: ${error.message}`);
    }
  }

  async deleteComment(commentId) {
    // Delete the comment from the comments collection
    const deletedComment = await Comment.findByIdAndDelete(commentId);
  
    if (!deletedComment) {
      return null; // Comment not found
    }
  
    // Debug statement to check the state of deletedComment
    console.log("Deleted comment:", deletedComment);
  
   
    // Remove the comment reference from the book's comments array
    await Book.updateOne(
      { comments: commentId },
      { $pull: { comments: commentId } }
    );
  
    return deletedComment;
  }
  

  async getAllComments() {
    try {
      // Fetch all comments and populate the author field to get author details
      const comments = await Comment.find().populate("author");
      return comments;
    } catch (error) {
      throw new Error(`Error fetching comments: ${error.message}`);
    }
  }
}

export default CommentService;
