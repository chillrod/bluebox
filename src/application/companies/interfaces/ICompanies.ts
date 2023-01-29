import { IUser } from "../../user/interface/IUser";

export interface ICompanies {
  id: string;
  name: string;
  userId: IUser;
  categories: string[];
  zipCode: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}
