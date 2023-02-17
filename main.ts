import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { initializeTables } from "./db.ts";
import router from "./routes/index.ts";

const app = new Application();

await initializeTables();

app.use(oakCors());
app.use(router.routes());

await app.listen({ port: 3000 });
