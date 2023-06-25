import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IContact } from "../../application/contact/contact.model";
import { Group } from "./Group";
import { IGroup } from "../../application/group/group.model";

@Entity()
export class Contact implements IContact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  lastContactedAt?: Date;

  @ManyToOne(() => Group, (group) => group.contacts)
  group: IGroup;
}
