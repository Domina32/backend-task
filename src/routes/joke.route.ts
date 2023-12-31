import express from "express";
import jokeController from "@/controllers/joke.controller";
const router = express.Router();

router.get("/new", jokeController.fetchNew);

router.get("/history", jokeController.getHistory);

export default router;
