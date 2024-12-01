import { Roles } from "./enums";

export interface User {
  id: number;
  email: string;
}

export interface UserWithoutSensitiveFields {
  id: number;
  email: string;
  roles: Roles[];
  firstName: string;
  lastName: string;
  dateRegistred: Date;
  isVerified: boolean;
}

type SimpleUser = {
  firstName: string;
  lastName: string;
};

export type { SimpleUser };
