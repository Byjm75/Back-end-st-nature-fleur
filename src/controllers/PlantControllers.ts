import { Request, Response } from "express";
import PlantService from "../services/PlantService";
import Plants from "../models/interfaces/Plants";

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
      res.send({ status: "OK", data: [idPlant] });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }
  async postPlant(req: Request, res: Response) {
    const newPlant: Plants = { ...req.body };
    try {
      await this.plantService.postPlant(newPlant);
      res.send({
        status: "OK",
        message: "nouvelle plante créé",
        data: newPlant,
      });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }
  async putPlant(req: Request, res: Response) {
    const updatePlant: Plants = { ...req.body };
    try {
      const id = Number(req.params.id);
      console.log(updatePlant);
      await this.plantService.putPlant(id, updatePlant);
      res.send({
        status: "OK",
        message: `Cette plante avec id ${id} à été modifier`,
        data: updatePlant,
      });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }
  async deletePlant(req: Request, res: Response) {
    const suppPlant: Plants = { ...req.body };
    try {
      const id = Number(req.params.id);
      await this.plantService.deletePlant(id, suppPlant);
      res.send({
        status: "OK",
        message: `Plante avec id ${id} supprimé.`,
        data: suppPlant,
      });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }
}
export default PlantControllers;
