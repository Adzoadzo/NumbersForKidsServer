import bcrypt from "bcrypt";
import Role from "../models/role.model";
import { error } from "util";
import { getConnection } from "typeorm";

export default class RoleService {
  /**
   * Get list of roles
   * @returns {Promise<Role[]>}
   */
  public static async find(): Promise<Role[]> {
    return await Role.find();
  }

  /**
   * Get list of roles
   * @returns {Promise<Role[]>}
   */
  public static async getRoles(): Promise<Role[]> {
    return await Role.find({ select: ["name", "id"] });
  }

  /**
   * Get single role
   * @returns {Promise<Role[]>}
   */
  public static async findOneBy(param: any, type: string): Promise<Role> {
    return await Role.findOne({ [type]: param });
  }

  /**
   * Create role
   * @returns {Promise<Role>}
   */
  public static async create(data: any): Promise<any> {
    try {
      return await Role.save(data);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  /**
   * Update role
   * @returns {Promise<Role>}
   */
  public static async update(id: number, data: any): Promise<any> {
    try {
      let role: Role = await Role.findOne({ id });
      if (!role) {
        return { error: 400, send: `role with id ${id} does not exist` };
      }

      role = { ...role, ...data };
      return await Role.save(role);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Remove role
   * @returns {Promise<Role>}
   */
  public static async remove(id: number): Promise<any> {
    try {
      const role = await Role.findOne({ id });
      return await Role.remove(role);
    } catch (e) {
      throw e;
    }
  }
}
