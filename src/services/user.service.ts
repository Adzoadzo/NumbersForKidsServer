import bcrypt from "bcrypt";
import { error } from "util";
import { getConnection } from "typeorm";
import User from "../models/user.model";

export default class UserService {
  /**
   * Get list of user
   * @returns {Promise<User[]>}
   */
  public static async find(
    filter?: any,
    pagination: any = { page: 1, rowsPerPage: 999 },
    sorting?: any
  ): Promise<User[]> {
    const toSkip: number = pagination?.rowsPerPage * (pagination?.page - 1);
    return await User.createQueryBuilder()
      .leftJoinAndSelect("User.role", "role", "role.id = User.roleId")
      .where(filter || {})
      .orderBy(sorting?.field || "User.id", sorting?.dir || "ASC")
      .skip(toSkip)
      .take(pagination?.rowsPerPage)
      .getMany();
  }

  /**
   * Get list of user
   * @returns {Promise<User[]>}
   */
  public static async list(): Promise<User[]> {
    return await User.find({ select: ["email", "id"] });
  }

  /**
   * Get one user
   * @returns {Promise<User[]>}
   */
  public static async findOneBy(filter: Record<string, any>): Promise<User> {
    return await User.findOne(filter);
  }

  /**
   * Create user
   * @returns {Promise<User>}
   */
  public static async create(data: any): Promise<any> {
    // TODO: validate password regex

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    try {
      const user = await User.save(data);
      delete user.password;
      return user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * Change user password
   * @returns {Promise<User>}
   */
  public static async changePassword(data: any): Promise<any> {
    try {
      const user: User = await User.findOne({ where: { email: data.email } });
      if (!user) {
        return { status: 400, send: "There is no user with this email" };
      } else {
        const valid: any = await bcrypt.compare(
          data.oldPassword,
          user.password
        );
        if (!valid) {
          return { status: 400, send: "Old password is not correct" };
        }

        user.password = await bcrypt.hash(data.newPassword, 10);
        const res = await user.save();
        delete res.password;

        return { status: 200, send: res };
      }
    } catch (e) {
      throw e;
    }
  }

  /**
   * Update user
   * @returns {Promise<User>}
   */
  public static async update(id: number, data: any): Promise<any> {
    try {
      let user: User = await User.findOne({ id });
      if (!user) {
        return { error: 400, send: `user with id ${id} does not exist` };
      }

      user = { ...user, ...data };
      return await User.save(user);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Remove user
   * @returns {Promise<User>}
   */
  public static async remove(id: number): Promise<any> {
    try {
      const user = await User.findOne({ id });
      return await User.remove(user);
    } catch (e) {
      throw e;
    }
  }
}
