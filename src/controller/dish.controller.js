// import {
//   create,
//   deleteById,
//   getAll,
//   getById,
//   updateById,
// } from "../service/dish.service.js";

// const createDish = async (req, res) => {
//   try {
//     const dish = await create(req.body);
//     res.status(201).json(dish);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const getDishes = async (req, res) => {
//   try {
//     const dishes = await getAll();
//     res.status(200).json(dishes);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const getDishById = async (req, res) => {
//   try {
//     const dish = await getById(req.params.id);
//     res.status(200).json(dish);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const updateDishById = async (req, res) => {
//   try {
//     const dish = await updateById(req.params.id, req.body);
//     res.status(200).json(dish);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const deleteDishById = async (req, res) => {
//   try {
//     await deleteById(req.params.id);
//     res.status(204).send();
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const getComments = async (req, res) => {
//   try {
//     const dish = await getById(req.params.id);
//     if (dish) {
//       res.status(200).json(dish.comments);
//     }


//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export { createDish, getDishes, getDishById, updateDishById, deleteDishById };

import BaseController from "./base.controller.js";
import DishService from "../service/dish.service.js";

class DishController extends BaseController {
  constructor() {
    super(new DishService());
  }


  async getComments(req, res, next) {
    try {
      const id = req.params.id;
      const comments = await this.service.getDishComments(id);
      if (!comments) {
        return res.status(404).json({ error: "Dish not found" });
      }
      return res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }

  async addComment(req, res, next) {
    try {
      const dishId = req.params.id;
      const commentData = req.body; // Assuming commentData contains 'rating' and 'comment'
      const userId = req.user._id; // Assuming req.user._id contains the user ID
  
      // Call the addComment method of DishService to add the comment
      const updatedDish = await this.service.addComment(dishId, commentData, userId);
  
      // Respond with the updated dish containing the newly added comment
      res.status(200).json(updatedDish);
    } catch (error) {
      // Pass any error to the error handling middleware
      next(error);
    }
  }
  
  
  async deleteComments(req, res, next){
    try {
      const dishId = req.params.id;
      const dish = await this.service.deleteComments(dishId);
      if (!dish) {
        return res.status(404).json({ error: "Dish not found" });
      }
      if (dish.comments.length === 0) {
        return res.status(200).json({ message: "All comments have been deleted" });
      } else {
        return res.status(200).json(dish.comments);
      }
    } catch (error) {
      next(error);
    }
  }
 
  async getCommentById(req, res, next){
    try {
      const {dishId, commentId} = req.params;
      // const comment = this.service.getCommentById(dishId, commentId);
      const dish = await this.service.populateAuthor(dishId);
      if (dish && dish.comments.id(commentId)) {
        res.status(200).json(dish.comments.id(req.params.commentId));
      }
      else if (!dish) {
        res.status(404).json({ error: "Dish not found" });
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
      const {dishId, commentId} = req.params;
      const {rating, comment} = req.body;
      const updatedDish = await this.service.updateComment(dishId, commentId, rating, comment);
      if (!updatedDish) {
        res.status(200).json(updatedDish);
      }
        res.status(404).json({ error: "Dish not found" });
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { dishId, commentId } = req.params;
      const updatedDish = await this.service.deleteComment(dishId, commentId);
      if (!updatedDish) {
        return res.status(404).json({ error: "Dish or comment not found" });
      }
      else {
        return res.status(200).json(updatedDish.comments.id(commentId));
      }
    } catch (error) {
      next(error);
    }
  }
  
}

export default DishController;
