import { AppDataSource } from "../data-source";
import Plants from "../models/interfaces/Plants";

class PlantService {
  async getAll(): Promise<Plants[]> {
    return AppDataSource.query(`SELECT * FROM plant;`);
  }
  async getId(id: Number): Promise<Plants> {
    return AppDataSource.query(`SELECT * FROM plant WHERE id = ${id};`);
  }
  async postPlant(newPlant: Plants): Promise<Plants> {
    return AppDataSource.query(`INSERT INTO plant (name, unitprice_ati, quantity, category, rating, url_picture)
      VALUES ('${newPlant.name}', '${newPlant.unitprice_ati}', '${newPlant.quantity}', '${newPlant.category}', 
      '${newPlant.rating}', '${newPlant.url_picture}');`);
  }
  async putPlant(id: number, updatePlant: Plants): Promise<Plants> {
    return AppDataSource.query(
      `UPDATE plant SET 
      name= '${updatePlant.name}', 
      unitprice_ati= ${updatePlant.unitprice_ati}, 
      quantity= ${updatePlant.quantity}, 
      category= '${updatePlant.category}', 
      rating= ${updatePlant.rating}, 
      url_picture= '${updatePlant.url_picture}' 
      WHERE id= ${id};`
    );
  }
  async deletePlant(id: number, suppPlant: Plants): Promise<Plants> {
    return AppDataSource.query(`DELETE FROM plant WHERE id = ${id};`);
  }
}

export default PlantService;
