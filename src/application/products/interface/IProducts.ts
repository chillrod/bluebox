import { ICompanies } from "../../companies/interface/ICompanies";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  company: ICompanies;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}
