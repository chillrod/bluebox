import { IUser } from "../../user/interface/IUser";

export interface ICompanies {
  id: string;
  name: string;
  userId: IUser;
  zipCode: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}
