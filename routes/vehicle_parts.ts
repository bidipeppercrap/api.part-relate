import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/", async (ctx) => {
  ctx.response.body = [{ name: "swingarm bushing", vehicle_id: 1 }, { name: "Fork Bushing", vehicle_id: 3 }];
});

export default router;
