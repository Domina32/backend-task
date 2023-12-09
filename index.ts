import express from "express";
import { NextFunction, Request, Response } from "express";
import jokeRouter from "routes/joke.route";

interface ResponseError extends Error {
    statusCode?: number;
}

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.use("/joke", jokeRouter);

app.use(
    (
        err: ResponseError,
        req: Request,
        res: Response,
        next: NextFunction,
    ): void => {
        const statusCode = err.statusCode || 500;
        console.error(err.message, err.stack);
        res.status(statusCode).json({ message: err.message });

        return;
    },
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
