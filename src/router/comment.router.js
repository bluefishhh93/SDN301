import { Router } from "express";
import CommentController from "../controller/comment.controller.js";
import { verifyUser } from "../authenticate.js";

const commentRouter = Router();
const commentController = new CommentController();

commentRouter
  .route("/")
  .get(async (req, res, next) => {
    await commentController.getAll(req, res, next);
  })
  .post(verifyUser,async (req, res, next) => {
    await commentController.addComment(req, res, next);
  })
  .put(async (req, res, next) => {
    res.status(405).send("Method Not Allowed");
  })
  .delete((req, res, next) => {
    res.status(405).send("Method Not Allowed");
  });

commentRouter
  .route("/:id")
  .get((req, res, next) => {
    commentController.getById(req, res, next);
  })
  .put(verifyUser,(req, res, next) => {
    commentController.updateComment(req, res, next);
  })
  .delete(verifyUser,(req, res, next) => {
    commentController.deleteComment(req, res, next);
  })
  .post((req, res, next) => {
    res.status(405).send("Method Not Allowed");
  });


export default commentRouter;
