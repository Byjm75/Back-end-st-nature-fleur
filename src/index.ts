import express from "express";
import cors from "cors";
import plantRouter from "./routes/PlantRoutes";
import PlantControllers from "./controllers/PlantControllers";
import AppDataSource from "./data-source";

AppDataSource.initialize().then(async () => {
  const app = express();
  const port = process.env.PORT || 8080;

  app.use(express.json()); // on paramétre la possibilitée de récupérer des info ds un body format json
  app.use(
    cors({
      origin: "*", // 'http://localhost: 3000'
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  ); // on paramétre le fait qu'une app puisse faire des requêtes avec ces méthodes référencées
  app.use("/api/plant", PlantControllers);
  app.use("/api/plant", plantRouter);

  app.listen(process.env.PORT, () => {
    console.log(`L'api est en route sur l'adresse localhost:${process.env.PORT}`);
  });
});
