import { describe, it, expect, jest } from "@jest/globals";
import userController from "@/controllers/user.controller";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "@/models/data-source";
import { User } from "@/models/entities/User";
import { ObjectLiteral } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userService from "@/services/user.service";

const env = process.env;

jest.mock("../../src/services/user.service");

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync("test password", salt);

jest.spyOn(AppDataSource.manager, "findOneBy").mockImplementation(
    async (): Promise<ObjectLiteral | null> => {
        return {
            email: "FindTest@email.com",
            password: hashedPassword,
            firstName: "test first name",
            lastName: "test last name",
            signedUp: true,
        };
    },
);

jest.spyOn(bcrypt, "compare");
jest.spyOn(bcrypt, "hash");
jest.spyOn(bcrypt, "genSalt").mockImplementation(() => salt);

jest.spyOn(jwt, "sign");

describe("userController.login()", () => {
    it("should log in an existing user", async () => {
        const req = {
            body: { email: "FindTest@email.com", password: "test password" },
        } as Request;
        const res = {
            status: (s) => {
                return res;
            },
            send: () => {},
        } as Response;
        const next = (() => {}) as NextFunction;

        await userController.login(req, res, next);

        expect(AppDataSource.manager.findOneBy).toHaveBeenCalledWith(User, {
            email: "FindTest@email.com",
        });
        expect(bcrypt.compare).toHaveBeenCalledWith(
            "test password",
            hashedPassword,
        );
        expect(jwt.sign).toHaveBeenCalled();
    });
});

describe("userController.signup()", () => {
    it("should sign up a new user", async () => {
        const req = {
            body: {
                email: "FindTest@email.com",
                password: "test password",
                firstName: "test first name",
                lastName: "test last name",
                signedUp: false,
            },
        } as Request;
        const res = {
            status: (s) => {
                return res;
            },
            send: () => {},
        } as Response;
        const next = (() => {}) as NextFunction;

        await userController.signup(req, res, next);

        expect(bcrypt.hash).toHaveBeenCalled();
        expect(userService.createEntry).toHaveBeenCalledWith(
            "FindTest@email.com",
            hashedPassword,
            "test first name",
            "test last name",
            false,
        );

        expect(jwt.sign).toHaveBeenCalled();

        const payload = { id: 5 };
        console.log(process.env);

        const token = jwt.sign(payload, env.TOKEN_SECRET);

        expect(jwt.sign).lastReturnedWith(token);
    });
});
