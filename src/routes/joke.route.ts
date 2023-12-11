import express from "express";
import jokeController from "../controllers/joke.controller";
const router = express.Router();

router.get("/new", jokeController.getNew);

router.get("/", jokeController.getHistory);

router.post("/", jokeController.create);

router.put("/:id", jokeController.update);

router.patch("/:id", jokeController.updatePartial);

router.delete("/:id", jokeController.remove);

export default router;
