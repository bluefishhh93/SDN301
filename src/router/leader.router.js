import express from "express";
import LeaderController from "../controller/leader.controller.js";
import { verifyUser } from "../authenticate.js";
import { isAdmin } from "../middleware/index.js";

const leaderRouter = express.Router();

const leaderController = new LeaderController();

leaderRouter
    .route("/")
    .get(async (req, res, next) => {
        await leaderController.getAll(req, res, next);
    })
    .post(verifyUser,isAdmin,async (req, res, next) => {
        await leaderController.create(req, res, next);
    })
    .put((req, res, next) => {
        res.status(405).send("Method not allowed");
    })
    .delete((req, res) => {
        res.status(405).send("Method not allowed");
    });

leaderRouter
    .route("/:id")
    .get(async (req, res, next) => {
        await leaderController.getById(req, res, next);
    })
    .put(verifyUser,isAdmin,async (req, res, next) => {
        await leaderController.update(req, res, next);
    })
    .delete(verifyUser,isAdmin,async (req, res, next) => {
        await leaderController.delete(req, res, next);
    })
    .post((req, res) => {
        res.status(405).send("Method not allowed");
    });

export default leaderRouter;