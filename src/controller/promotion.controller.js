// import {
//   deleteById,
//   getById,
//   getAll,
//   create,
//   updateById,
// } from "../service/promotion.service.js";

// const createPromotion = async (req, res, next) => {
//     try {
//       // Validate request body
//       if (!req.body || Object.keys(req.body).length === 0) {
//         return res.status(400).json({ error: "Invalid request body" });
//       }
  
//       // Create promotion
//       const promotion = await create(req.body);
  
//       // Check if promotion was created successfully
//       if (!promotion) {
//         return res.status(400).json({ error: "Promotion not created" });
//       }
  
//       // Respond with the created promotion
//       res.status(201).json(promotion);
//     } catch (error) {
//       // Pass error to the error handling middleware
//       next(error);
//     }
//   };
  
//   export default createPromotion;
  

// const getPromotions = async (req, res) => {
//   try {
//     const promotions = await getAll();
//     res.status(200).json(promotions);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const getPromotionById = async (req, res) => {
//   try {
//     const promotion = await getById(req.params.id);
//     res.status(200).json(promotion);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const updatePromotionById = async (req, res) => {
//   try {
//     const promotion = await updateById(req.params.id, req.body);
//     res.status(200).json(promotion);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// const deletePromotionById = async (req, res) => {
//   try {
//     await deleteById(req.params.id);
//     res.status(204).send();
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export {
//   createPromotion,
//   getPromotions,
//   getPromotionById,
//   updatePromotionById,
//   deletePromotionById,
// };

import BaseController from "./base.controller.js";
import PromotionService  from "../service/promotion.service.js";

class PromotionController extends BaseController {
  constructor() {
    super(new PromotionService());
  }
}

export default PromotionController;