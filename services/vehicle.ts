import { z } from "https://deno.land/x/zod/mod.ts";
import { db } from "../db.ts";

const vehicleSchema = z.object({
  name: z.string()
});

const vehiclePartSchema = z.object({
  name: z.string()
})

export class VehicleService {

  async listVehicle(keyword = "") {
    await db.connect();
    const vehicles = await db.queryObject(`SELECT * FROM vehicles WHERE name LIKE '%${keyword}%' ORDER BY name`);
    await db.end();
    
    return vehicles;    
  }

  async deleteVehicle(id: string) {
    await db.connect();
    const vehicle = await db.queryObject(`DELETE FROM vehicles WHERE id = '${id}'`);
    await db.end();

    return vehicle;
  }

  async createVehicle(vehicle) {
    vehicleSchema.parse(vehicle);
    
    await db.connect();
    
    const res = await db.queryObject(`INSERT INTO vehicles (name) VALUES ('${vehicle.name}')`);
    
    await db.end();
    
    return res;
  }

  async createVehiclePart(vehicleId: string, part) {
    z.string().parse(vehicleId);
    vehiclePartSchema.parse(part);
    
    await db.connect();
    const res = await db.queryObject(`INSERT INTO vehicle_parts (vehicle_id, name) VALUES('${vehicleId}', '${part.name}')`);
    await db.end();

    return res;
  }

  async assignPart(partId: string, vehiclePartId: string) {
    //if (partId || vehiclePartId == null || undefined) throw new Error("Please specify an id for part and vehicle");

    await db.connect();
    const res = await db.queryObject(`INSERT INTO part_vehicle (part_id, vehicle_part_id) VALUES('${partId}', '${vehiclePartId}')`);
    await db.end();

    return res;
  }

  async listVehiclePartItems(vehiclePartId: string) {
    await db.connect();
    const res = await db.queryObject(`
      SELECT parts.id, parts.name FROM part_vehicle
      JOIN parts ON part_vehicle.part_id = parts.id
      WHERE part_vehicle.vehicle_part_id = '${vehiclePartId}'
    `);
    await db.end();

    return res.rows;
  }

  async listVehiclePart(id: string) {
    await db.connect();
    const res = await db.queryObject(`SELECT id, name FROM vehicle_parts WHERE vehicle_id = '${id}'`);
    await db.end();

    return res.rows;
  }
  
  async getVehicle(id: string) {
    if (!id) throw new Error("Please specify an id");

    await db.connect();

    const vehicles = await db.queryObject(`SELECT * FROM vehicles WHERE id = '${id}'`);

    if (vehicles.length < 1) throw new Error("Not found");

    const vehicle = vehicles.rows[0];
    const vehicle_parts = await this.listVehiclePart(vehicle.id);
    const vehicle_part_items = await Promise.all(vehicle_parts.map(async part => {
      const items = await this.listVehiclePartItems(part.id);

      part.items = items;

      return part;
    }));

    await db.end();

    const res = {
      id: vehicle.id,
      name: vehicle.name,
      parts: vehicle_part_items
    };
    
    return res;
  }
}
