import { Request, Response } from "express";
import PlantService from "../services/PlantService";

export class PlantControllers {
  private plantService = new PlantService();

  async getAll(req: Request, res: Response) {
    try {
      const allPlant = await this.plantService.getAll();
      res.send({ status: "OK", data: [allPlant] });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }
  async getId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const idPlant = await this.plantService.getId(id);
      res.send({ satus: "OK", data: [idPlant] });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }
  async postPlant(req: Request, res: Response) {
    try {
      const newPlant = await this.plantService.postPlant();
      res.send({ status: "OK", data: [newPlant] });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
}


}
export default PlantControllers;
