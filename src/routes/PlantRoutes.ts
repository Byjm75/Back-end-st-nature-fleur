import { Router } from "express";
import PlantControllers from "../controllers/PlantControllers";

const plantRouter = Router();
const plantControllers = new PlantControllers();

plantRouter.get('/', (req, res) => {
    plantControllers.getAll(req, res);
 });

export default plantRouter;
