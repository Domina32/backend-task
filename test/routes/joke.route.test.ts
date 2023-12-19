import supertest from "supertest";
import { describe, it, expect, jest, beforeAll, afterAll } from "@jest/globals";
import { NextFunction, Response, Request } from "express";
import { getServer } from "../../index";
import { AppDataSource } from "@/models/data-source";
import { afterEach, beforeEach } from "node:test";

const server = getServer();
let requestWithSupertest: supertest.SuperTest<supertest.Test>;

describe("GET /joke/new", () => {
    beforeAll(async () => {
        requestWithSupertest = supertest(await server);
    });

    beforeEach(async () => {
        await AppDataSource.initialize();
    });

    afterEach(async () => {
        await AppDataSource.destroy();
    });

    afterAll(async () => {
        (await server).close();
        await AppDataSource.destroy();
    });

    it("should get new joke from API for logged in user", async () => {
        const result = await requestWithSupertest.get("/joke/new");
    });
});
