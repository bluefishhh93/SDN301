import express from "express";
import GenreController from "../controller/genre.controller.js";

const genreRouter = express.Router();

const genreController = new GenreController();

genreRouter
  .route("/")
  .get(async (req, res, next) => {
    await genreController.getAll(req, res, next);
  })
  .post(async (req, res, next) => {
    await genreController.create(req, res, next);
  })
  .put((req, res, next) => {
    res.status(405).send("Method not allowed");
  })
  .delete((req, res) => {
    res.status(405).send("Method not allowed");
  });

genreRouter
  .route("/:id")
  .get(async (req, res, next) => {
    await genreController.getById(req, res, next);
  })
  .put(async (req, res, next) => {
    await genreController.update(req, res, next);
  })
  .delete(async (req, res, next) => {
    await genreController.delete(req, res, next);
  })
  .post((req, res) => {
    res.status(405).send("Method not allowed");
  });

export default genreRouter;
