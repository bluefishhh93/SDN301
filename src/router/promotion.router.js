import express from "express";
import PromotionController from "../controller/promotion.controller.js";
import { isAdmin } from "../middleware/index.js";
import { verifyUser } from "../authenticate.js";

// Promotion Routes
const promotionRouter = express.Router();
const promotionController = new PromotionController();

promotionRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      await promotionController.getAll(req, res);
    } catch (error) {
      next(error);
    }
  })
  .post(verifyUser,isAdmin,async (req, res, next) => {
    try {
      await promotionController.create(req, res);
    } catch (error) {
      next(error);
    }
  })
  .put((req, res) => {
    res.status(405).send("Method not allowed");
  })
  .delete((req, res) => {
    res.status(405).send("Method not allowed");
  });

promotionRouter
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      await promotionController.getById(req, res);
    } catch (error) {
      next(error);
    }
  })
  .post((req, res) => {
    res.status(405).send("Method not allowed");
  })
  .put(verifyUser,isAdmin,async (req, res, next) => {
    try {
      await promotionController.update(req, res);
    } catch (error) {
      next(error);
    }
  })
  .delete(verifyUser,isAdmin,async (req, res, next) => {
    try {
      await promotionController.delete(req, res);
    } catch (error) {
      next(error);
    }
  });

export default promotionRouter;