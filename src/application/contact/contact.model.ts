import { IGroup } from "../group/group.model";

export interface IContact {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  lastContactedAt: Date;
  groups?: IGroup[];
  contactInfo?: IContactInfo;
}
