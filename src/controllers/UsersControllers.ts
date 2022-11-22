import { Request, Response } from "express";
import { UserService } from "../services/UsersService";
import Users from "../models/interfaces/Users";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export class UsersControllers {
  private usersService = new UserService();

  /*
   * ICI INSCRIPTION AU SITE DE USER ET MP GENERE AVEC LE HASH DE BCRYPT
   **/
  async inscription(req: Request, res: Response) {
    console.log("user controller inscription", req.body);
    const newUser: Users = {
      name: req.body.name,
      email: req.body.email,
      hashPassworld: req.body.passworld,
    };
    console.log(newUser);
    bcrypt.hash(newUser.hashPassworld, 10, async (err, hashPassworld) => {
      console.log(err);
      try {
        newUser.hashPassworld = hashPassworld;
        console.log(newUser.hashPassworld);
        await this.usersService.inscription(newUser);
        res.send({
          status: "OK",
          message: "Félicitaion, vous vous êtes inscrit avec succés !",
          data: newUser,
        });
      } catch (error) {
        res.status(500).send({ status: "Failed", message: error });
      }
    });
  }
  /*
   * ICI CONNECTION AU SITE DE USER ET COMPARAISON DU MP AVEC BCRYPT.COMPARE
   **/
  async connexion(req: Request, res: Response) {
    const userChek = { ...req.body };
    console.log(userChek);
    const userRecupMail = await this.usersService.logUser(userChek);
    console.log(userRecupMail);
    if (userRecupMail.length === 0) {
      res.status(404).send({
        status: "echec de connexion",
        message: "email invalide !",
      });
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(
      userChek.passworld,
      userRecupMail[0].hashPassworld
    );
    console.log(isPasswordCorrect);
    if (isPasswordCorrect === false) {
      res.status(404).send({
        status: "echec de connexion",
        message: "Mot de Passe non valide, essaie encore",
      });
      return;
    }
    // ****** ICI JE GENERE LE JWT ******EX sur le repo plant-api-authent**************
    let secretKey: string;
    if (process.env.SECRET_KEY_TOKEN) {
      secretKey = process.env.SECRET_KEY_TOKEN;

      jsonwebtoken.sign(
        {
          sub: userRecupMail[0].id,
        },
        secretKey,
        { expiresIn: "4h" },
        (err: any, token: string | undefined) => {
          console.log("err", err);
          console.log("Token", token);
          console.log("Type Token", typeof token);
          //Renvoyer le token
          res.status(200).send({
            token: token,
            message: "Félicitation tu as eu ton token d'authentification",
          });
        }
      );
    } else {
      res
        .status(500)
        .send({ message: "Merci de contacter votre administrateur" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    console.log("------------- MiddleWare getAllUsers ");
    const users = await this.usersService.getAllUsers();
    res.status(200).send({ data: users });
  }

  /*Vérif de l'authencité d'un token en fonction de sa signature
   *Coté API on récupè le token
   **/

  async deleteUser(req: Request, res: Response) {
    const suppUser: Users = { ...req.body };
    try {
      const id = Number(req.params.id);
      await this.usersService.deleteUser(id, suppUser);
      res.send({
        status: "OK",
        message: `Le compte utilisateur avec id ${id} à été supprimé.`,
        data: suppUser,
      });
    } catch (error) {
      res.status(500).send({ status: "Failed", message: error });
    }
  }
}
