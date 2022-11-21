import express from "express";
import cors from "cors";
import plantRouter from "./routes/PlantRoutes";
import userRouter from "./routes/UsersRoutes";
import AppDataSource from "./data-source";

AppDataSource.initialize().then(async () => {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: "*", // 'http://localhost: 3000'
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
  app.use("/api/plant", plantRouter);
  app.use("/api/user", userRouter);
  // app.use("/api/user/loging", userRouter);

  app.listen(process.env.PORT, () => {
    console.log(
      `L'api est en route sur l'adresse localhost:${process.env.PORT}`
    );
  });
});

/*
*Création de la secretKey

const secretKey = "lemotdepassechoisi";
    bcrypt.hash(secretKey, 12, async (err, secretKey) => {
      console.log(secretKey);
    });
const secretKeyHash = jwt.sign


jwt.sign({role: "ADMIN", idUser: 3 }, secretKey, (err, newtoken) => {
  console.log("err", err);
  console.log("Token autresite", newtoken);
})
*Vérif de l'authencité d'un token en fonction de sa signature
*Coté API on récupè le token

const token = "lehashsecretkeygenere"

jwt.verify(token, secretKey, (err, decoded) => {
  console.log("Err", err);
  console.log("Verify", decoded);
});

**/
