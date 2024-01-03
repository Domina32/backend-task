import supertest from "supertest";
import { describe, it, expect, jest, beforeAll, afterAll } from "@jest/globals";
import { AppDataSource } from "@/models/data-source";
import { getServer } from "../..";
import { afterEach, beforeEach } from "node:test";
import { IncomingMessage, Server, ServerResponse } from "node:http";

let server: Server<typeof IncomingMessage, typeof ServerResponse>;
let requestWithSupertest: supertest.SuperTest<supertest.Test>;

describe("GET /joke/new", () => {
    beforeAll(async () => {
        server = await getServer();
        requestWithSupertest = supertest(server);
    });

    afterAll(async () => {
        server.close();

        // TODO: Why is this needed? Postgres connection closed error
        let timeout = new Promise((resolve) =>
            setTimeout(() => resolve(1), 2500),
        );

        await timeout;

        await AppDataSource.destroy();
    });

    beforeEach(async () => {
        await AppDataSource.initialize();
    });

    afterEach(async () => {
        await AppDataSource.destroy();
    });

    it("should get new joke from API for logged in user", async () => {
        let result = await requestWithSupertest.post("/user/signup").send({
            email: "EMAIL@email.com",
            password: "PASSWORD",
            firstName: "FIRST NAME",
            lastName: "LAST NAME",
        });

        expect(result.statusCode).toBe(200);

        result = await requestWithSupertest.post("/user/login").send({
            email: "EMAIL@email.com",
            password: "PASSWORD",
        });

        expect(result.statusCode).toBe(200);

        const token = result.body.token;

        result = await requestWithSupertest
            .get("/joke/new")
            .set("Authorization", `Bearer ${token}`);

        expect(result.statusCode).toBe(200);
        expect(result.body).toHaveProperty("value");
    });

    it("should reject the request with missing auth token", async () => {
        let result = await requestWithSupertest.post("/user/signup").send({
            email: "EMAIL@email.com",
            password: "PASSWORD",
            firstName: "FIRST NAME",
            lastName: "LAST NAME",
        });

        expect(result.statusCode).toBe(200);

        result = await requestWithSupertest
            .get("/joke/new")
            .set("Authorization", `Bearer`);

        expect(result.statusCode).toBe(401);
    });

    it("should reject the request with incorrect auth token", async () => {
        let result = await requestWithSupertest.post("/user/signup").send({
            email: "EMAIL@email.com",
            password: "PASSWORD",
            firstName: "FIRST NAME",
            lastName: "LAST NAME",
        });

        expect(result.statusCode).toBe(200);

        result = await requestWithSupertest.post("/user/login").send({
            email: "EMAIL@email.com",
            password: "PASSWORD",
        });

        expect(result.statusCode).toBe(200);

        const token = "wrong token";

        result = await requestWithSupertest
            .get("/joke/new")
            .set("Authorization", `Bearer ${token}`);

        expect(result.statusCode).toBe(400);
    });

    it("should get all previously fetched jokes for currently logged in user", async () => {
        let result = await requestWithSupertest.post("/user/signup").send({
            email: "EMAIL@email.com",
            password: "PASSWORD",
            firstName: "FIRST NAME",
            lastName: "LAST NAME",
        });

        expect(result.statusCode).toBe(200);

        result = await requestWithSupertest.post("/user/login").send({
            email: "EMAIL@email.com",
            password: "PASSWORD",
        });

        expect(result.statusCode).toBe(200);

        const token = result.body.token;

        result = await requestWithSupertest
            .get("/joke/new")
            .set("Authorization", `Bearer ${token}`);

        expect(result.statusCode).toBe(200);

        result = await requestWithSupertest
            .get("/joke/history")
            .set("Authorization", `Bearer ${token}`);

        expect(result.statusCode).toBe(200);
        expect(result.body.length).toBeGreaterThan(0);
    });
});
