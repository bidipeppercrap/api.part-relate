import { Router } from "https://deno.land/x/oak/mod.ts";
import { VehicleService } from "../services/vehicle.ts";
import { db } from "../db.ts";

const router = new Router();
const vehicleService = new VehicleService();

router.get("/", async (ctx) => {
  const vehicles = await vehicleService.listVehicle();
  
  ctx.response.body = vehicles;
});

router.post("/", async (ctx) => {
  const vehicle = await ctx.request.body().value;
  
  try {
    await vehicleService.createVehicle(vehicle);
  } catch (error){
    console.log(error);
    ctx.response.body = "failed";
  }
  
  ctx.response.body = vehicle;
})

export default router;
