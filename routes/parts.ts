import { Router } from "https://deno.land/x/oak/mod.ts";
import { PartService } from "../services/part.ts";

const router = new Router();
const partService = new PartService();

router.post("/", async (ctx) => {
  const part = await ctx.request.body().value;

  try {
    const res = await partService.createPart(part);

    ctx.response.body = res;
  } catch (error) {
    ctx.response.body = error;
  }
});

router.get("/", async (ctx) => {
  const keyword: string = ctx.request.url.searchParams.get("keyword") || "";
  const parts = await partService.listParts(keyword);

  ctx.response.body = parts;
});

export default router;
