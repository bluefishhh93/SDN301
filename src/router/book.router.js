import express from "express";
import BookController from "../controller/book.controller.js";
import { verifyUser } from "../authenticate.js";
import { isAdmin } from "../middleware/index.js";

const bookRouter = express.Router();

const bookController = new BookController();



bookRouter
  .route("/")
  .get(async (req, res, next) => {
    if (req.query.price) {
      await bookController.getBooksBelowPrice(req, res, next);
     } else {
      // await bookController.getAll(req, res, next);
      await bookController.getAllBooks(req, res, next);
    }
  })
  .post(verifyUser,isAdmin, async (req, res, next) => {
    await bookController.create(req, res, next);
  })
  .put((req, res, next) => {
    res.status(405).send("Method not allowed");
  })
  .delete((req, res) => {
    res.status(405).send("Method not allowed");
  });

bookRouter
  .route("/:id")
  .get(async (req, res, next) => {
    await bookController.getById(req, res, next);
  })
  .put(async (req, res, next) => {
    await bookController.update(req, res, next);
  })
  .delete(async (req, res, next) => {
    await bookController.delete(req, res, next);
  })
  .post((req, res) => {
    res.status(405).send("Method not allowed");
  });

bookRouter
  .route("/:id/comments")
  .get(async (req, res, next) => {
    await bookController.getComments(req, res, next);
  })
  .post(async (req, res, next) => {
    await bookController.addComments(req, res, next);
  })
  .put((req, res, next) => {
    res.status(405).send("Method not allowed");
  })
  .delete(async (req, res, next) => {
    await bookController.deleteComments(req, res, next);
  });

bookRouter
.route("/:id/populate")
.get(async (req, res, next) => {
  await bookController.getFilteredComments(req, res, next);
});




export default bookRouter;
