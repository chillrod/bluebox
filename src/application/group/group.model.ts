import { IContact } from "../contact/contact.model";

export interface IGroup {
  id: string;
  name: string;
  contacts: IContact[];
}
