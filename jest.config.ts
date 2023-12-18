import { pathsToModuleNameMapper } from "ts-jest";
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
import { compilerOptions } from "./tsconfig.json";
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",

    preset: "ts-jest",
    testEnvironment: "node",

    moduleFileExtensions: ["ts", "js", "json"],

    moduleDirectories: ["node_modules", "src"],
    roots: ["./test"],
    modulePaths: [compilerOptions.baseUrl],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),

    globalSetup: "./test/setup.ts",
};

export default config;
