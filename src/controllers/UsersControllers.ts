import { Request, Response } from "express";
import { UserService } from "../services/UsersService";
import Users from "../models/interfaces/Users";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken"; 

export class UsersControllers {
  private usersService = new UserService();

  async postUser(req: Request, res: Response) {
    const newUser: Users = { ...req.body };
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.hashpass, salt, async (err, hashpass) => {
        console.log(hashpass);
        try {
          newUser.hashpass = hashpass;
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
    });
  }
  async postLoging(req: Request, res: Response) {
    const newUser: Users = { ...req.body };
    const reshEmail = req.params.email;
    if (!reshEmail) {
      console.log(reshEmail)
      res.status(400).send({
        status: "Failed", data: { error: "Veuilez entrer un mail valide" },
      });
      return;
    }
    //bcrypt.compare("un autre mot de passe", newUser.email, async (err, res) => {
    
      
  }     
  }
/*
    try {
      const newLoging.email = email;

    }

  **/
    /*
    bcrypt.compare("un autre mot de passe", hash, function (err, res) {
      console.log(res)  
  });
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
