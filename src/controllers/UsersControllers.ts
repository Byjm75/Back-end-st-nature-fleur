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
  async postUser(req: Request, res: Response) {
    const newUser = { ...req.body };
    bcrypt.hash(newUser.passworld, 10, async (err, hashPassworld) => {
      console.log(hashPassworld);
      try {
        newUser.passworld = hashPassworld;
        await this.usersService.postUser(newUser);
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
    let secretKey;
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
    res.send({
      status: "ok",
      message: "Bien joué, tu es connecté(e)(s)",
    });
  }
  /*Vérif de l'authencité d'un token en fonction de sa signature
   *Coté API on récupè le token
   **/
  async verify(req: Request, res: Response) {
    console.log("UserControllers - verify - headers : ", req.headers);
    const tokenHeaders = req.headers.authorization;
    console.log("tokenHeaders :", tokenHeaders);

    let token;
    if (tokenHeaders) {
      token = tokenHeaders.split("")[1];
      console.log("token :", token);
    }
    if (!token) {
      res.status(401).send({ message: "Token manquand" });
      return;
    }
    let secretKey: string;
    if (process.env.SECRET_KEY_TOKEN) {
      secretKey = process.env.SECRET_KEY_TOKEN;

      jsonwebtoken.verify(token, secretKey, (err: any, decoded: any) => {
        console.log("Err", err);
        console.log("Verify 1", decoded);
        if (!err) {
          res.status(200).send({ message: "le token est ok" });
        } else {
          res
            .status(403)
            .send({ message: "le token est faux !!!!", error: err });
          res.status(500).send({ message: "Contacter le dev" });
        }
      });
    }
  }

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
//      CORRECTION
// voir repository "experimentation-authentification"

/*
jwt.verify(token, secretKey, (err, decoded) => {
  console.log("Err", err);
  console.log("Verify", decoded);
});
* jwt.sign({
  data: 'foobar'
}, 'secret', { expiresIn: '1h' });


    const validPassword = await bcrypt.compare(
      userChek.passworld,
      userRecup[0].hashpass
    );
    console.log(validPassword);

*/
// *********************
