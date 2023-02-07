import { Application } from "https://deno.land/x/oak/mod.ts";

import { initializeTables } from "./db.ts";
import router from "./routes/index.ts";

const app = new Application();

await initializeTables();

app.use(router.routes());
await app.listen({ port: 8000 });
