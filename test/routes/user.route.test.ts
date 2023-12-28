import supertest from "supertest";
import { describe, it, expect, jest, beforeAll, afterAll } from "@jest/globals";
import { AppDataSource } from "@/models/data-source";
import { getServer } from "../..";
import { afterEach, beforeEach } from "node:test";
import { IncomingMessage, Server, ServerResponse } from "node:http";

let server: Server<typeof IncomingMessage, typeof ServerResponse>;
let requestWithSupertest: supertest.SuperTest<supertest.Test>;

describe("POST /user/login", () => {
    beforeAll(async () => {
        server = await getServer();
        requestWithSupertest = supertest(await server);
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
    it("should log the user in", async () => {
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
    });

    it("should fail logging in with incorrect credentials", async () => {
        let result = await requestWithSupertest.post("/user/signup").send({
            email: "EMAIL@email.com",
            password: "PASSWORD",
            firstName: "FIRST NAME",
            lastName: "LAST NAME",
        });

        expect(result.statusCode).toBe(200);

        result = await requestWithSupertest.post("/user/login").send({
            email: "wrongEMAIL@email.com",
            password: "PASSWORD",
        });

        expect(result.statusCode).toBe(401);

        result = await requestWithSupertest.post("/user/login").send({
            email: "EMAIL@email.com",
            password: "wrongPASSWORD",
        });

        expect(result.statusCode).toBe(401);
    });

    it("should fail logging in when user is not signed up", async () => {
        const result = await requestWithSupertest.post("/user/login").send({
            email: "wrongEMAIL@email.com",
            password: "PASSWORD",
        });

        expect(result.statusCode).toBe(401);
    });
});
