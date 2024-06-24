import express from "express";
import DishController from "../controller/dish.controller.js";
import { verifyUser } from "../authenticate.js";
import { isAdmin } from "../middleware/index.js";
const dishRouter = express.Router();

const dishController = new DishController();

dishRouter
  .route("/")
  .get(verifyUser,async (req, res, next) => {
  // .get(verifyUser,isAdmin,async (req, res, next) => {
    await dishController.getAll(req, res, next);
  })
  .post(verifyUser,isAdmin,async (req, res, next) => {
    await dishController.create(req, res, next);
  })
  .put((req, res, next) => {
    res.status(405).send("Method not allowed");
  })
  .delete((req, res) => {
    res.status(405).send("Method not allowed");
  });

dishRouter
  .route("/:id")
  .get(async (req, res, next) => {
    await dishController.getById(req, res, next);
  })
  .put(verifyUser,isAdmin,async (req, res, next) => {
    await dishController.update(req, res, next);
  })
  .delete(verifyUser,isAdmin,async (req, res, next) => {
    await dishController.delete(req, res, next);
  })
  .post((req, res) => {
    res.status(405).send("Method not allowed");
  });

dishRouter
  .route("/:id/comments")
  .get(verifyUser,async (req, res, next) => {
    await dishController.getComments(req, res, next);
  })
  .post(verifyUser,async (req, res, next) => {
    await dishController.addComment(req, res, next);
  })
  .put((req, res, next) => {
    res.status(405).send("Method not allowed");
  })
  .delete(verifyUser,async (req, res, next) => {
    await dishController.deleteComments(req, res, next);
  });

dishRouter
  .route("/:dishId/comments/:commentId")
  .get(verifyUser,async (req, res, next) => {
    await dishController.getCommentById(req, res, next);
  })
  .post((req, res, next) => {
    res.status(405).send("Method not allowed");
  })
  .put(async (req, res, next) => {
    dishController.updateComment(req, res, next);
  })
  .delete((req, res, next) => {
    dishController.deleteComment(req, res, next);
  });

export default dishRouter;
