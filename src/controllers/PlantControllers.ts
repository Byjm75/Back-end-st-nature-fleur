import { Request, Response } from "express";
import PlantService from "../services/PlantService";

class PlantControllers {
  private plantService = new PlantService();

  async getAll(req: Request, res: Response) {
    try {
      const plant = await this.plantService.getAll();
      res.send({ status: "OK", data: [plant] });
    } catch (error) {
      res.status(500).send({ status: 'Failed', message: error });
    }
  }
}
export default PlantControllers;
