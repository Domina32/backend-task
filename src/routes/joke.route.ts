import express from "express";
import jokeController from "@/controllers/joke.controller";
const router = express.Router();

router.get("/new", jokeController.fetchNew);

router.get("/", jokeController.getHistory);

router.post("/", jokeController.create);

export default router;
