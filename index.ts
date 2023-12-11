import "module-alias/register";
import "reflect-metadata";
import express from "express";
import jokeRouter from "@/routes/joke.route";
import { errorHandler } from "@/middleware/error.middleware";
import { logger } from "@/middleware/logging.middleware";

const app = express();
const port = process.env.PORT || 3000;

// ignoring bodyParser (expecting JSON)

app.use(logger);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});
app.use("/joke", jokeRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
