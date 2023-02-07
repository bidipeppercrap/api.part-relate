import { DataTypes, Model } from "https://deno.land/x/denodb/mod.ts";

export class Motor extends Model {
  static table = "motors";
  
  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  };
}
