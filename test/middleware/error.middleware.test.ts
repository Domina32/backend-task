import { ResponseError, errorHandler } from "@/middleware/error.middleware";
import { describe, it, expect, jest } from "@jest/globals";
import { NextFunction, Response, Request } from "express";

global.console.error = jest.fn(async () => {});

describe("errorHandler()", () => {
    it("should return status code 500 when missing statusCode fields on given error", async () => {
        const err = {
            stack: "error stack",
            message: "error message",
        } as ResponseError;
        const req = {} as Request;
        const res: { status: jest.Mock; json: jest.Mock } = {
            status: jest.fn((s) => {
                return res;
            }),
            json: jest.fn(() => {}),
        };
        const next = (() => {}) as NextFunction;

        errorHandler(err, req, res as unknown as Response, next);

        expect(console.error).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect((res.json.mock.calls[0][0] as ResponseError).message).toBe(
            "error message",
        );
    });

    it("should return status code of given error when it exists", async () => {
        const err = {
            stack: "error stack",
            message: "error message",
            statusCode: 400,
        } as ResponseError;
        const req = {} as Request;
        const res: { status: jest.Mock; json: jest.Mock } = {
            status: jest.fn((s) => {
                return res;
            }),
            json: jest.fn(() => {}),
        };
        const next = (() => {}) as NextFunction;

        errorHandler(err, req, res as unknown as Response, next);

        expect(console.error).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect((res.json.mock.calls[0][0] as ResponseError).message).toBe(
            "error message",
        );
    });
});
