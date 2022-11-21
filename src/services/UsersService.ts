import { AppDataSource } from "../data-source";
import Users from "../models/interfaces/Users";

export class UserService {
  async postUser(newUser: any): Promise<Users> {
    return AppDataSource.query(`INSERT INTO users(name, hashpassword, email)
      VALUES ('${newUser.name}', '${newUser.hashPassworld}', '${newUser.email}');`);
  }
  async logUser(logingUser: Users): Promise<Users[]> {
    return AppDataSource.query(
      `SELECT * FROM users WHERE email = '${logingUser.email}';`
    );
  }
  async deleteUser(id: number, suppUser: Users): Promise<Users> {
    return AppDataSource.query(`DELETE FROM users WHERE id = ${id};`);
  }
}

    // ****** ICI JE GENERE LE JWT ********************
