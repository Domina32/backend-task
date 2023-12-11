import * as pg from "pg";
import dbConfig from "configs/db.config";

async function query(sql: string): Promise<void> {
    const client = new pg.Client({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        port: dbConfig.port,
    });

    await client.connect();
    try {
        const result = await client.query("SELECT $1::text as message", [
            "Hello world!",
        ]);
        console.log(result.rows[0].message); // Hello world!
        await client.end();
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}

export default {
    query,
};
