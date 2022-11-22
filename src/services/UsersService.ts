import { AppDataSource } from "../data-source";
import Users from "../models/interfaces/Users";

export class UserService {
  async getAllUsers(): Promise<Users[]> {
    return AppDataSource.query(`SELECT * FROM myusers;`);
  }

  async inscription(newUser: Users): Promise<Users> {
    return AppDataSource.query(`INSERT INTO users(name, hashpass, email)
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
