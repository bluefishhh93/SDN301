import BaseController from "./base.controller.js";
import BookService from "../service/book.service.js";

class BookController extends BaseController {
  constructor() {
    super(new BookService());
  }
  async getAllBooks(req, res, next) {
    try {
      const books = await this.service.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const book = await this.service.populateAuthor(req.params.id);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      return res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }
  

  async getComments(req, res, next) {
    try {
      const id = req.params.id;
      const book = await this.service.populateAuthor(id);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      // console.log(book)
      return res.status(200).json(book.comments);
    } catch (error) {
      next(error);
    }
  }

  async addComments(req, res, next){
    try {
      const bookId = req.params.id;
      const commentData = req.body; // Assuming commentData contains 'rating' and 'comment'
      const userId = req.user._id; // Assuming req.user._id contains the user ID
  
      // Call the addComment method of DishService to add the comment
      const updatedBook = await this.service.addComment(bookId, commentData, userId);
  
      // Respond with the updated dish containing the newly added comment
      res.status(200).json(updatedBook);
    } catch (error) {
      // Pass any error to the error handling middleware
      next(error);
    }
  }
  
  async deleteComments(req, res, next){
    try {
      const bookId = req.params.id;
      const book = await this.service.deleteComments(bookId);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      if (book.comments.length === 0) {
        return res.status(200).json({ message: "All comments have been deleted" });
      } else {
        return res.status(200).json(book.comments);
      }
    } catch (error) {
      next(error);
    }
  }

  async getCommentById(req, res, next){
    try {
      const {bookId, commentId} = req.params;
      // const comment = this.service.getCommentById(dishId, commentId);
      const book = await this.service.getById(bookId);
      if (book != null && book.comments.id(commentId) != null) {
        res.status(200).json(book.comments.id(req.params.commentId));
      }
      else if (book == null) {
        res.status(404).json({ error: "Book not found" });
      }
      else {
        res.status(404).json({ error: "Comment not found" });
      }
      
    } catch (error) {
      next(error);
    }
  }
  async updateComment(req, res, next) {
    try {
      const {bookId, commentId} = req.params;
      const {rating, comment} = req.body;
      const updatedBook = await this.service.updateComment(bookId, commentId, rating, comment);
      if (updatedBook != null) {
        res.status(200).json(updatedBook);
      }
      else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { bookId, commentId } = req.params;
      const updatedBook = await this.service.deleteComment(bookId, commentId);
      if (updatedBook != null) {
        res.status(200).json(updatedBook);
      }
      else {
        res.status(404).json({ error: "Book not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async getFilteredComments(req, res, next) {
    try {
      const { id } = req.params;
      const keywords = ['excellent', 'good'];
      const filteredComments = await this.service.filterCommentsByKeywords(id, keywords);
      if (filteredComments.length > 0) {
        res.status(200).json(filteredComments);
      } else {
        res.status(404).json({ error: "No matching comments found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async getBooksBelowPrice(req, res, next) {
    try {
      const price = req.query.price;
      const books = await this.service.getBooksBelowPrice(price);
      res.json(books);
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
