import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

export const db = new Client({
  database: "partrelate",
  hostname: Deno.env.get("DATABASE_HOST"),
  user: Deno.env.get("DATABASE_USERNAME"),
  password: Deno.env.get("DATABASE_PASSWORD"),
  port: 26257,
  tls: { enforce: true }
});

const reset = Deno.env.get("DATABASE_RESET");

export async function initializeTables() {
  await db.connect();

  // if (reset) { await db.queryObject(drop_everything) }

  await db.queryObject(create_table_vehicles);
  await db.queryObject(create_table_parts);
  await db.queryObject(create_table_vehicle_parts);
  await db.queryObject(create_table_part_vehicle);
  
  await db.end();
}

const drop_everything = `
  DROP TABLE IF EXISTS part_vehicle;
  DROP TABLE IF EXISTS vehicle_parts;
  DROP TABLE IF EXISTS parts;
  DROP TABLE IF EXISTS vehicles;
`

const create_table_vehicles = `CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL
)`;

const create_table_vehicle_parts = `CREATE TABLE IF NOT EXISTS vehicle_parts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  vehicle_id UUID NOT NULL REFERENCES vehicles (id) ON DELETE CASCADE
)`;

const create_table_parts = `CREATE TABLE IF NOT EXISTS parts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL
)`;

const create_table_part_vehicle = `CREATE TABLE IF NOT EXISTS part_vehicle (
  part_id UUID REFERENCES parts (id) ON DELETE CASCADE,
  vehicle_part_id UUID REFERENCES vehicle_parts (id) ON DELETE CASCADE,
  PRIMARY KEY (part_id, vehicle_part_id)
)`;
