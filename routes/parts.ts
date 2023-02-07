import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/", (ctx) => {
  const parts = [
    {
      name: "axle 10x200"
    },
    {
      name: "axle 10x230"
    }
  ];

  ctx.response.body = parts;
});

export default router;
