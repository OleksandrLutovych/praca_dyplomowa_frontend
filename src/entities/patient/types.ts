import { SimpleUser } from "../user/types";

export interface Patient {
  id: number;
  user: SimpleUser;
  age: string;
  pesel: string;
  address: string;
  phone: string;
}
