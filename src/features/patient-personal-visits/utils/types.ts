import { VisitSubType, VisitType } from "../../../entities/visits/enums";

type PatientPersonalVisit = {
  id: number;
  date: Date;
  doctor: {
    firstName: string;
    lastName: string;
    proffesion: string;
  };
  place: string;
  type: VisitType;
  subType: VisitSubType;
  createdAt: Date;
};

export type { PatientPersonalVisit };
