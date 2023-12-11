import { NextFunction, Response, Request } from "express";

// TODO block everything except sign up and log in

async function checkLogin(req: Request, res: Response, next: NextFunction) {}

async function login() {}

async function signup() {}

export default {
    checkLogin,
    login,
    signup,
};
