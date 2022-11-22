import { NextFunction, Request, Response, Router } from "express";
import { UsersControllers } from "../controllers/UsersControllers";
import { isAdmin, isAuth } from "../middlewares/isAuth";

const userRouter = Router();
const UserControllers = new UsersControllers();

// Ici inscription de user au site
userRouter.post("/inscription", (req, res) => {
  UserControllers.inscription(req, res);
});
// Ici connexion de user au site
userRouter.post("/loging", (req, res) => {
  UserControllers.connexion(req, res);
});
// GET http://localhost:8080/api/users
// utilisation du middleware isAuth et isAdmin
userRouter.get("/", isAuth, isAdmin, (req, res) => {
  UserControllers.getAllUsers(req, res);
});

userRouter.delete("/:id", (req, res) => {
  UserControllers.deleteUser(req, res);
});

export default userRouter;
