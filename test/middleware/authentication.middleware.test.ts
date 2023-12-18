import { describe, it, expect, jest } from "@jest/globals";
import { NextFunction, Response, Request } from "express";
import { verifyUserToken } from "@/middleware/authentication.middleware";
import jwt from "jsonwebtoken";

const env = process.env;

jest.spyOn(jwt, "verify");

describe("verifyUserToken()", () => {
    it("should verify given token", async () => {
        const req = {
            headers: { authorization: "test TestAuthorization" },
            body: {},
        } as Request;
        const res = {
            status: jest.fn((s) => {
                return res;
            }),
            send: jest.fn(() => {}),
        } as unknown as Response;
        const next = (() => {}) as NextFunction;

        await verifyUserToken(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith(
            "TestAuthorization",
            env.TOKEN_SECRET,
        );
    });

    it("should fail verification when token is missing", async () => {
        const req = {
            headers: { authorization: "" },
            body: {},
        } as Request;
        const res = {
            status: jest.fn((s) => {
                return res;
            }),
            send: jest.fn(() => {}),
        } as unknown as Response;
        const next = (() => {}) as NextFunction;

        await verifyUserToken(req, res, next);

        expect(res.status).toBeCalledWith(401);
    });

    it("should fail verification when given incorrect token", async () => {
        const req = {
            headers: { authorization: "test wrongToken" },
            body: {},
        } as Request;
        const res = {
            status: jest.fn((s) => {
                return res;
            }),
            send: jest.fn(() => {}),
        } as unknown as Response;
        const next = (() => {}) as NextFunction;

        await verifyUserToken(req, res, next);

        expect(res.status).toBeCalledWith(400);
    });
});
