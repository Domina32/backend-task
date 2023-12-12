import type { Config } from "jest";
/** @type {import('ts-jest').JestConfigWithTsJest} */

const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",

    preset: "ts-jest",
    testEnvironment: "node",

    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

    moduleDirectories: ["node_modules", "src"],
};

export default config;
