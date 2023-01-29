import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ICompanies } from "../../application/companies/interfaces/ICompanies";

@Entity()
export class Companies implements ICompanies {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  userId: string;

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
