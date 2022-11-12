import PlantControllers from "../controllers/PlantControllers";
import { AppDataSource } from "../data-source";
import Plants from "../models/interfaces/Plants";

class PlantService {
  async getAll(): Promise<Plants[]> {
    return AppDataSource.query(`SELECT * FROM plant;`);
  }
  async getId(id: Number): Promise<Plants> {
    return AppDataSource.query(`SELECT * FROM plant where id = ${id};`);
  }
  async postPlant(): Promise<Plants> {
    return AppDataSource.query(` `);
  }
}

export default PlantService;
