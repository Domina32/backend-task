import express from "express";
import jokeController from "../controllers/joke.controller";
const router = express.Router();

router.get("/", jokeController.get);

router.post("/", jokeController.create);

router.put("/", jokeController.update);

router.delete("/", jokeController.remove);

export default router;
