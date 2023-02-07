import { Router } from "https://deno.land/x/oak/mod.ts";
import vehicles from "./vehicles.ts";
import parts from "./parts.ts";

const router = new Router();

router.get("/", (ctx) => {
  const info = {
    author: {
      name: "bidipeppercrap",
      phone: "+62 851 7171 9191",
      mail: "bidipeppercrap@proton.me"
    }
  }
  ctx.response.body = info;
});

router.use("/vehicles", vehicles.routes(), vehicles.allowedMethods());
router.use("/parts", parts.routes(), parts.allowedMethods());

export default router;
