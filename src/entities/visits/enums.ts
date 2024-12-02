import { Doctor } from "../doctor/types";

enum VisitType {
  ONLINE = "ONLINE",
  STATIONARY = "STATIONARY",
}

enum VisitSubType {
  FIRST = "FIRST",
  FOLLOW_UP = "FOLLOW_UP",
  CONTROL = "CONTROL",
}

interface Visit {
  id: number;
  date: Date;
  type: VisitType;
  subType: VisitSubType;
  doctor: Doctor;
  service: {
    service: string;
    price: number;
    recomendation: string;
  };
  place: string;
}

export { VisitType, VisitSubType };
export type { Visit };
