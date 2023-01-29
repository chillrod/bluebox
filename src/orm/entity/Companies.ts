import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { ICompanies } from "../../application/companies/interfaces/ICompanies";
import { User } from "./User";

@Entity()
export class Companies implements ICompanies {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  userId: User;

  @Column()
  zipCode: string;

  @Column("text", { array: true })
  categories: string[];

  @Column()
  phone: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
