import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { IProduct } from "../../application/products/interface/IProducts";
import { Companies } from "./Companies";

@Entity()
export class Products implements IProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("float")
  price: number;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  active: boolean;

  @ManyToOne(() => Companies)
  @JoinColumn({ name: "companyId" })
  company: Companies;
}
