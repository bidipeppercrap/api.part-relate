import { Router } from "https://deno.land/x/oak/mod.ts";
import { VehicleService } from "../services/vehicle.ts";

const router = new Router();
const vehicleService = new VehicleService();

router.post("/parts/:id/items", async (ctx) => {
  const vehiclePartId = ctx.params.id;
  const req = await ctx.request.body().value;
  const partId = req.part_id;

  try {
    await vehicleService.assignPart(partId, vehiclePartId);

    ctx.response.body = req;
  } catch (error) {
    ctx.response.body = error;
  }
});

router.get("/parts/:id/items", async (ctx) => {
  const vehiclePartId = ctx.params.id;

  try {
    const items = await vehicleService.listVehiclePartItems(vehiclePartId);

    ctx.response.body = items;
  } catch (error) {
    ctx.response.body = error;
  }
})

router.get("/:id/parts", async (ctx) => {
  const vehicleId = ctx.params.id;

  try {
    const res = await vehicleService.listVehiclePart(vehicleId);

    ctx.response.body = res;
  } catch (error) {
    ctx.response.body = error;
  }
});

router.post("/:id/parts", async (ctx) => {
  const vehicleId = ctx.params.id;
  const part = await ctx.request.body().value;

  try {
    const res = await vehicleService.createVehiclePart(vehicleId, part);
    ctx.response.body = res;
  } catch (error) {
    ctx.response.body = "failed";
  }
});

router.delete("/:id", async (ctx) => {
  const vehicleId = ctx.params.id;

  try {
    const res = await vehicleService.deleteVehicle(vehicleId);

    ctx.response.body = res;
  } catch (error) {
    ctx.response.body = error;
  }
});

router.get("/:id", async (ctx) => {
  try {
    const vehicle = await vehicleService.getVehicle(ctx.params.id);

    ctx.response.body = vehicle;
  } catch (error) {
    ctx.response.body = error;    
  }
});

router.post("/", async (ctx) => {
  const vehicle = await ctx.request.body().value;
  
  try {
    await vehicleService.createVehicle(vehicle);
  } catch (error) {
    ctx.response.body = "failed";
  }
  
  ctx.response.body = vehicle;
});

router.get("/", async (ctx) => {
  const keyword = ctx.request.url.searchParams.get("keyword");
  const vehicles = await vehicleService.listVehicle(keyword || "");
  
  ctx.response.body = vehicles.rows;
});

export default router;
