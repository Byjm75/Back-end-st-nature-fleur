import { Router } from "express";
import PlantControllers from "../controllers/PlantControllers";

const plantRouter = Router();
const plantControllers = new PlantControllers();

plantRouter.get('/', (req, res) => {
    plantControllers.getAll(req, res);
})
plantRouter.get('/:id', (req, res) => {
  plantControllers.getId(req, res);
})
plantRouter.post('/', (req, res) => {
    plantControllers.postPlant(req, res);
})

export default plantRouter;
