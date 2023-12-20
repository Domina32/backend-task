declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            PORT: string;

            DB_HOST: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_NAME: string;

            TOKEN_SECRET: string;

            EMAIL_SENDER: string;
            APP_PASSWORD: string;

            DB_NAME_TEST: string;
            NODE_ENV: "test" | "development" | "production";
        }
    }
}

export {};
