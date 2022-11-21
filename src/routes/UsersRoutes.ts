import { Router } from "express";
import { UsersControllers } from "../controllers/UsersControllers";

const userRouter = Router();
const UserControllers = new UsersControllers();

userRouter.post("/", (req, res) => {
  UserControllers.postUser(req, res);
});
userRouter.post("/loging", (req, res) => {
  UserControllers.connexion(req, res);
});
userRouter.delete("/:id", (req, res) => {
  UserControllers.deleteUser(req, res);
});

export default userRouter;

// ****** ICI JE GENERE LE JWT ********************
