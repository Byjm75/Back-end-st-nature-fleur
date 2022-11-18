// ICI J'ESSAIS D'ADAPTER LE CODE POUR BCRYPT ET JSWEBTOCKEN
/*
--------------DANS LE CONTROLLER

*export const loginOne = async (req: Request, res: Response) => {
 try {
   const foundUser = await userServices.login(req.body);
   res.status(200).send(foundUser);
 } catch (error) {
   return res.status(500).send(getErrorMessage(error));
 }
};

export const registerOne = async (req: Request, res: Response) => {
 try {
   await userServices.register(req.body);
   res.status(200).send('Inserted successfully');
 } catch (error) {
   return res.status(500).send(getErrorMessage(error));
 }
};

Step 2: Hashing passwords

  async postUser(req: Request, res: Response) {
    const newUser: Users = { ...req.body };
    bcrypt.hash(newUser.hashpass, 10, async (err, hashpass) => {
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
  }

  Step 3. Tokens Implementation
    Understep 1 -Create a token while logging in
    Understep 2 -Verify token while logging
    Understep 3 -Send token to the frontend

--------------DANS LE SERVICE ?

if (isMatch) {
     const token = jwt.sign({ _id: foundUser._id?.toString(), name: foundUser.name }, SECRET_KEY, {
       expiresIn: '2 days',
     });

     return { user: { _id, name }, token: token };
   } else {
     throw new Error('Password is not correct');
   }

--------------DANS LE CONTROLLER

export const loginOne = async (req: Request, res: Response) => {
 try {
   const foundUser = await userServices.login(req.body);
   //console.log('found user', foundUser.token);
   res.status(200).send(foundUser);
 } catch (error) {
   return res.status(500).send(getErrorMessage(error));
 }
};

--------------DANS LE ROUTER (si le midleware à été crée)

Router.get('/all', auth, searchController.getAll);
Router.post('/', auth, searchController.addOne);
Router.delete('/:id', auth, searchController.deleteOne);




**/
