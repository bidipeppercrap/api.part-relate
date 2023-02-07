import { z } from "https://deno.land/x/zod/mod.ts";
import { db } from "../db.ts";

const vehicleSchema = z.object({
  name: z.string()
});

const vehiclePartSchema = z.object({
  vehicle_id: z.string(),
  name: z.string()
})

export class VehicleService {

  async listVehicle(keyword: string = "") {
    await db.connect();
    const vehicles = await db.queryArray(`SELECT * FROM vehicles`);
    await db.end();
    
    return vehicles;    
  }

  async createVehicle(vehicle) {
    vehicleSchema.parse(vehicle);
    
    await db.connect();
    
    const res = await db.queryObject(`INSERT INTO vehicles (name) VALUES ('${vehicle.name}')`);
    
    await db.end();
    
    return res;
  }

  async createVehiclePart(vehiclePart) {
    vehiclePartSchema.parse(vehiclePart);
    
    await db.connect();
    const res = await db.queryObject(`INSERT INTO vehicle_parts (vehicle_id, name) VALUES('${vehiclePart.vehicle_id}', '${vehiclePart.name}')`);
    await db.end();
  }
  
  async getVehicle(id) {
    await db.connect();
    const vehicle = await db.queryObject(`SELECT * FROM vehicles WHERE id = ${id}`);
    await db.end();
    
    return vehicle;
  }
}
