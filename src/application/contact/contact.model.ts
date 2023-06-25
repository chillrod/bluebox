import { IGroup } from "../group/group.model";

export interface IContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  lastContactedAt?: Date;
  group: IGroup;
  // contactInfo?: IContactInfo;
}
