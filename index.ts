import "module-alias/register";
import "reflect-metadata";
import bodyParser from "body-parser";
import express from "express";
import jokeRouter from "@/routes/joke.route";
import userRouter from "@/routes/user.route";
import { errorHandler } from "@/middleware/error.middleware";
import { logger } from "@/middleware/logging.middleware";
import { AppDataSource } from "@/models/data-source";
import { verifyUserToken } from "@/middleware/authentication.middleware";

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        const port = process.env.PORT || 3000;

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(logger);
        app.use(errorHandler);

        // app.get("/", (req, res) => {
        //     res.json({ message: "ok" });
        // });

        app.use("/user", userRouter);
        // app.use("/signup", userRouter);
        // app.use("/login", userRouter);

        app.use("/joke", verifyUserToken, jokeRouter);

        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });
    })
    .catch((e) => {
        console.error("Error during Data Source initialization:", e.message);
    });
