import BaseService from "./base.service.js";
import Dish from "../Schema/dish.js";

class DishService extends BaseService {
  constructor() {
    super(Dish);
  }

  // async addComments(dishId, comment) {
  //   try {
  //     const dish = await this.getById(dishId);
  //     dish.comments.push(comment);
  //     return await dish.save();
  //   } catch (error) {
  //     throw new Error(`Error adding comment: ${error.message}`);
  //   }
  // }

  // async deleteComments(dishId) {
  //   try {
  //     const dish = await this.getById(dishId);
  //     //remove all comments
  //     dish.comments = [];
  //     return await dish.save();
  //   } catch (error) {
  //     throw new Error(`Error deleting comment: ${error.message}`);
  //   }
  // }

  // async updateComment(dishId, commentId, rating, comment) {
  //   try {
  //     const dish = await this.getById(dishId);
  //     if (dish && dish.comments.id(commentId)) {
  //       if (rating) {
  //         dish.comments.id(commentId).rating = rating;
  //       }
  //       if (comment) {
  //         dish.comments.id(commentId).comment = comment;
  //       }
  //       return await dish.save();
  //     } else if (!dish) {
  //       throw new Error(`Dish not found`);
  //     } else {
  //       throw new Error(`Comment not found`);
  //     }
  //   } catch (error) {
  //     throw new Error(`Error updating comment: ${error.message}`);
  //   }
  // }

  // async deleteComment(dishId, commentId) {
  //   try {
  //     const dish = await this.model.findById(dishId);
  //     if (dish && dish.comments.id(commentId)) {
  //       dish.comments.id(commentId).remove();
  //       return dish.save();
  //     } else if (!dish) {
  //       throw new Error(`Dish ${dishId} not found`);
  //     } else {
  //       throw new Error(`Comment ${commentId} not found`);
  //     }
  //   } catch (error) {
  //     throw new Error(`Error deleting comment: ${error.message}`);
  //   }
  // }
  async getAll() {
    try {
      return await this.model.find().populate("comments.author");
    } catch (error) {
      throw new Error(`Error getting all entities: ${error.message}`);
    }
  }


  async getDishComments(dishId) {
    try {
      const dish = await this.populateAuthor(dishId);
      if (!dish) {
        throw new Error("Dish not found");
      }

      return dish.comments;
    } catch (error) {
      throw new Error(`Error getting comments: ${error.message}`);
    }
  }

  async addComment(dishId, commentData, userId) {
    try {
      // Fetch the dish by its ID
      const dish = await this.getById(dishId);
      if (!dish) {
        throw new Error(`Dish ${dishId} not found`);
      }
  
      // Construct the comment object with author and other data
      const comment = {
        rating: commentData.rating,
        comment: commentData.comment,
        author: userId,
      };
  
      // Push the comment into the dish's comments array
      dish.comments.push(comment);
  
      // Save the dish with the new comment
      await dish.save();
  
      // Populate author information in the comments array
      const populatedDish = await this.populateAuthor(dishId);
  
      return populatedDish;
    } catch (error) {
      // Handle any errors and throw a new error with a descriptive message
      throw new Error(`Error adding comment: ${error.message}`);
    }
  }
  
  

  async deleteComments(dishId) {
    try {
      const dish = await this.getById(dishId);
      //remove all comments
      dish.comments = [];
      await dish.save();
      return this.populateAuthor(dishId);
    } catch (error) {
      throw new Error(`Error deleting comment: ${error.message}`);
    }
  }

  async updateComment(dishId, commentId, rating, comment) {
    try {
      const dish = await this.getById(dishId);
      if (dish && dish.comments.id(commentId)) {
        if (rating) {
          dish.comments.id(commentId).rating = rating;
        }
        if (comment) {
          dish.comments.id(commentId).comment = comment;
        }
        await dish.save();
        return this.populateAuthor(dishId);
      } else if (!dish) {
        throw new Error(`Dish not found`);
      } else {
        throw new Error(`Comment not found`);
      }
    } catch (error) {
      throw new Error(`Error updating comment: ${error.message}`);
    }
  }

  async deleteComment(dishId, commentId) {
    try {
      const dish = await this.getById(dishId);
      if (dish && dish.comments.id(commentId)) {
        dish.comments.id(commentId).remove();
        await dish.save();
        return this.populateAuthor(dishId);
      } else if (!dish) {
        throw new Error(`Dish ${dishId} not found`);
      } else {
        throw new Error(`Comment ${commentId} not found`);
      }
    } catch (error) {
      throw new Error(`Error deleting comment: ${error.message}`);
    }
  }

  async populateAuthor(dishId) {
    try {
      // Directly use the Mongoose model to start a new query
      return await Dish.findById(dishId).populate("comments.author");
    } catch (error) {
      throw new Error(`Error populating author: ${error.message}`);
    }
  }
}

export default DishService;
