import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IIntegrations } from "../../application/integrations/interface/IIntegrations";

@Entity()
export class Integrations implements IIntegrations {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;
}
