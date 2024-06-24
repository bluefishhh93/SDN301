import BaseService from "./base.service.js";
import Book from "../Schema/book.js";

class BookService extends BaseService {
  constructor() {
    super(Book);
  }
  //get all book and populate author
  async getAllBooks() {
    try {
      const books = await this.model.find().populate({
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User'
        }
      });
      if(books.length === 0){
        throw new Error(`No books found`);
      }
      return books;
    } catch (error) {
      throw new Error(`Error getting all books: ${error.message}`);
    }
  }

  async updateBook(filter, update) {
    // Assuming `filter` helps identify the book and `update` contains the $pull operation
    try {
      const updatedBook = await Book.findOneAndUpdate(filter, update, { new: true });
      if (!updatedBook) {
        throw new Error('Book not found or no update made');
      }
      return updatedBook;
    } catch (error) {
      // Handle errors, e.g., log them or throw custom error
      console.error('Error updating book:', error);
      throw error;
    }
  }
      

  async getBookComments(bookId) {
    try {
      const book = await this.populateAuthor(bookId);
      if (!book) {
        throw new Error("book not found");
      }
      console.log(book, "book")

      return book.comments;
    } catch (error) {
      throw new Error(`Error getting comments: ${error.message}`);
    }
  }

  async addComment(bookId, commentData, userId) {
    try {
      const book = await this.getById(bookId);
      if (!book) {
        throw new Error(`book ${bookId} not found`);
      }
  
      // Create and save the comment
      const comment = new Comment({
        ...commentData,
        author: userId,
      });
      await comment.save();
  
      // Push the comment's ID into the book's comments array
      book.comments.push(comment._id);
  
      // Save the book with the new comment reference
      await book.save();
  
      return book.populate('comments'); // Populate to return detailed comments if needed
    } catch (error) {
      throw new Error(`Error adding comment: ${error.message}`);
    }
  }
  
  async filterCommentsByKeywords(bookId, keywords) {
    try {
      const book = await this.populateAuthor(bookId);  
          
      if (!book) {
        throw new Error("book not found");
      }

      
      const filteredComments = book.comments.filter(comment =>
        keywords.some(keyword => comment.comment.toLowerCase().includes(keyword))
      );
      return filteredComments;
    } catch (error) {
      throw new Error(`Error filtering comments: ${error.message}`);
    }
  }
  
  

  async deleteComment(bookId, commentId) {
    try {
      const book = await this.getById(bookId);
      if (!book) {
        throw new Error(`book ${bookId} not found`);
      }
  
      // Remove the comment reference from the book's comments array
      book.comments.pull(commentId);
      await book.save();
  
      // Remove the comment from the Comment collection
      await Comment.findByIdAndRemove(commentId);
  
      return book.populate('comments'); // Populate to return detailed comments if needed
    } catch (error) {
      throw new Error(`Error deleting comment: ${error.message}`);
    }
  }

  async updateComment(bookId, commentId, rating, comment) {
    try {
      const book = await this.getById(bookId);
      if (book && book.comments.id(commentId)) {
        if (rating) {
          book.comments.id(commentId).rating = rating;
        }
        if (comment) {
          book.comments.id(commentId).comment = comment;
        }
        await book.save();
        return this.populateAuthor(bookId);
      } else if (!book) {
        throw new Error(`book not found`);
      } else {
        throw new Error(`Comment not found`);
      }
    } catch (error) {
      throw new Error(`Error updating comment: ${error.message}`);
    }
  }

  async deleteComment(bookId, commentId) {
    try {
      const book = await this.getById(bookId);
      if (book && book.comments.id(commentId)) {
        book.comments.id(commentId).remove();
        await book.save();
        return this.populateAuthor(bookId);
      } else if (!book) {
        throw new Error(`book ${bookId} not found`);
      } else {
        throw new Error(`Comment ${commentId} not found`);
      }
    } catch (error) {
      throw new Error(`Error deleting comment: ${error.message}`);
    }
  }

 async populateAuthor(bookId) {
  try {
    // Pass bookId to findById to query the specific book
    const book = await this.model.findById(bookId).populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User'
      }
    });
    return book;
  } catch (error) {
    throw new Error(`Error populating author: ${error.message}`);
  }
}
  async getBooksBelowPrice(price) {
    try {
      const books = await Book.find({ price: { $lt: price } });
      if(books.length === 0){
        throw new Error(`No books found below price: ${price}`);
      }
      return books;
    } catch (error) {
      throw new Error(`Error getting books below price: ${error.message}`);
    }
  }
}

export default BookService;