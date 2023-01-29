import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { ICompanies } from "../../application/companies/interface/ICompanies";
import { User } from "./User";

@Entity()
export class Companies implements ICompanies {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, {
    cascade: ["insert", "update", "remove"],
  })
  @JoinColumn({ name: "userId" })
  userId: User;

  @Column()
  zipCode: string;

  @Column()
  phone: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
