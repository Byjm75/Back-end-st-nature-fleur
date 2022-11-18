import { Request, Response } from "express";
import { UserService } from "../services/UsersService";
import Users from "../models/interfaces/Users";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export class UsersControllers {
  private usersService = new UserService();

  async postUser(req: Request, res: Response) {
    const newUser = { ...req.body };
    //bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.passworld, 10, async (err, passworld) => {
      console.log(passworld);
      try {
        newUser.passworld = passworld;
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
  // 1 Comparer le mail utilisateur
  // 2 Mettre en place le Bycrypt.compare
  // 3 Mettre en place le JsonWebToken

  async postLoging(req: Request, res: Response) {
    const userChek = { ...req.body };
    console.log(userChek);
    const userRecup = await this.usersService.logUser(userChek);
    console.log(userRecup);
    if (userRecup.length === 0) {
      res.status(404).send({
        status: "echec de connexion",
        message: "email invalide !",
      });
      return;
    }
    const validPassword = await bcrypt.compare(
      userChek.passworld,
      userRecup[0].hashpass
    );
    console.log(validPassword);

    if (validPassword === false) {
      res.status(404).send({
        status: "echec de connexion",
        message: "Mot de Passe non valide, essaie encore",
      });
      return;
    }

    // ****** GENERER LE JWT ********************

    // *********************

    res.send({
      status: "ok",
      message: "Bien joué, tu es connecté(e)(s)",
    });
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

/*
    bcrypt.compare("un autre mot de passe", hash, function (err, res) {
      console.log(res)  
  });
  **/

/*
//var bcrypt = require('bcrypt');

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("mon mot de passe", salt, function(err, hash) {
        // Store hash in your password DB.
    });
});
bcrypt.compare("un autre mot de passe", hash, function(err, res) {
    // res == false
});
**/
