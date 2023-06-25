import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { IGroup } from "../../application/group/group.model";

import { Contact } from "./Contact";
import { IContact } from "../../application/contact/contact.model";

@Entity()
export class Group implements IGroup {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Contact, (contact) => contact.group)
  contacts: IContact[];

  @Column({ type: "timestamp", nullable: true })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;
}
