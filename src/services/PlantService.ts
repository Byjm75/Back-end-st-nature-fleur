import { AppDataSource } from "../data-source";
import { Plants } from "../models/interfaces/Plants";

export class PlantService {
  async getAll(): Promise<Plants[]> {
    return AppDataSource.query(`SELECT * FROM plant;`);
  }
}

export default PlantService;
