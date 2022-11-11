import { AppDataSource } from "../data-source";
import { Plant } from "../models/interfaces/Plants";

 export class PlantService {

  async getAll(): Promise<Plant[]> {
    return AppDataSource.query (`SELECT * FROM plant;`);
  }
}

export default PlantService;
