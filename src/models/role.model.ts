import {
    BaseEntity,
    Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique
} from "typeorm";
import { ROLE } from "../config/tables";
import User from "./user.model";

@Entity(ROLE)
export default class Role extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  public id?: number;

  @Column({ length: 50, unique: true })
  public name: string;

  @Column({ nullable: true })
  public description: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  public createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
  })
  public updatedAt: Date;

  @OneToMany((type) => User, (user) => user.role)
  public users?: User[];
}
