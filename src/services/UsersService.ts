import { AppDataSource } from "../data-source";
import Users from "../models/interfaces/Users";

export class UserService {
  async postUser(newUser: Users): Promise<Users> {
    return AppDataSource.query(`INSERT INTO users(name, hashpass, email)
      VALUES ('${newUser.name}', '${newUser.hashpass}', '${newUser.email}');`);
  }
  async deleteUser(id: number, suppUser: Users): Promise<Users> {
    return AppDataSource.query(`DELETE FROM users WHERE id = ${id};`);
  }
  async logUser(logingUser: Users, email: string): Promise<Users> {
    return AppDataSource.query(
      `SELECT email FROM users = '${logingUser.email}');`
    );
  }
}
