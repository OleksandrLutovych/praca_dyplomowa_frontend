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

enum VisitStatus {
  CREATED = "CREATED",
  CANCELED = "CANCELED",
  ACCEPTED = "ACCEPTED",
  FINISHED = "FINISHED",
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

export { VisitType, VisitSubType, VisitStatus };
export type { Visit };
