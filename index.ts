import "module-alias/register";
import "reflect-metadata";
import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";
import jokeRouter from "@/routes/joke.route";
import userRouter from "@/routes/user.route";
import { errorHandler } from "@/middleware/error.middleware";
import { logger } from "@/middleware/logging.middleware";
import { AppDataSource } from "@/models/data-source";
import { verifyUserToken } from "@/middleware/authentication.middleware";

const getServer = async () => {
    const app = express();

    try {
        await AppDataSource.initialize();
        const port = process.env.PORT || 3000;

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(logger);
        app.use(errorHandler);

        // app.get("/", (req, res) => {
        //     res.json({ message: "ok" });
        // });

        app.use("/user", userRouter);

        app.use("/joke", verifyUserToken, jokeRouter);

        const server = app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`);
        });

        return server;
    } catch (error) {
        throw error;
    }
};

export { getServer };
