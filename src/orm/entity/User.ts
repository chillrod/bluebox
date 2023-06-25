import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../../application/user/interface/IUser";

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
