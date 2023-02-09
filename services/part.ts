import { z } from "https://deno.land/x/zod/mod.ts";
import { db } from "../db.ts";

const partSchema = z.object({
  name: z.string()
});

export class PartService {
    async createPart(part) {
        partSchema.parse(part);

        await db.connect();
        const res = await db.queryObject(`INSERT INTO parts(name) VALUES('${part.name}')`);
        await db.end();

        return res;
    }

    async listParts(keyword: string = "") {
        await db.connect();
        const res = await db.queryObject(`SELECT * FROM parts WHERE name LIKE '%${keyword}%'`);
        await db.end();

        return res.rows;
    }
}
