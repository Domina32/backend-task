import "module-alias/register";
import "reflect-metadata";
import express from "express";
import jokeRouter from "@/routes/joke.route";
import userRouter from "@/routes/user.route";
import { errorHandler } from "@/middleware/error.middleware";
import { logger } from "@/middleware/logging.middleware";
import { AppDataSource } from "@/models/data-source";

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        const port = process.env.PORT || 3000;

        // ignoring bodyParser (expecting JSON)

        app.use(logger);
        app.use(errorHandler);

        app.get("/", (req, res) => {
            res.json({ message: "ok" });
        });
        app.use("/joke", jokeRouter);
        app.use("/user", userRouter);

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
    })
    .catch((e) => {
        console.error("Error during Data Source initialization:", e.message);
    });
