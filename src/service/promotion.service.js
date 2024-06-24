// //service
// import Promotion from "../Schema/promotion.js";

// const create = async (promotionData) => {
//     try {
//       const promotion = new Promotion(promotionData);
//       return await promotion.save();
//     } catch (error) {
//       throw new Error(`Error creating promotion: ${error.message}`);
//     }
//   };
  

// const getAll = async () => {
//     try {
//         const promotions = await Promotion.find();
//         return promotions;
//     } catch (error) {
//         throw new Error(`Error getting promotions: ${error.message}`);
//     }
// }

// const getById = async (id) => {
//     try {
//         const promotion = await Promotion.findById(id);
//         return promotion;
//     } catch (error) {
//         throw new Error(`Error getting promotion by ID: ${error.message}`);
//     }
// }

// // Update promotion by ID
// const updateById = async (id, promotionData) => {
//     try {
//         const promotion = await Promotion.findByIdAndUpdate(id, promotionData, { new: true });
//         return promotion;
//     } catch (error) {
//         throw new Error(`Error updating promotion by ID: ${error.message}`);
//     }
// };

// const deleteById = async (id) => {
//     try {
//         await Promotion.findByIdAndDelete(id);
//     } catch (error) {
//         throw new Error(`error deleting promotion by ID: ${error.message}`);
//     }
// };

// export { create, getAll, getById, updateById, deleteById };


// services/userService.js
import BaseService from './base.service.js';
import Promotion from '../Schema/promotion.js';

class PromotionService extends BaseService {
  constructor() {
    super(Promotion);
  }

  // Add custom methods for UserService if needed
}

export default PromotionService;
