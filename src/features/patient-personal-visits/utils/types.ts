import {
  VisitStatus,
  VisitSubType,
  VisitType,
} from "../../../entities/visits/enums";

type PatientPersonalVisit = {
  id: number;
  date: Date;
  doctor: {
    proffesion: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
  place: string;
  type: VisitType;
  subType: VisitSubType;
  createdAt: Date;
  service: {
    price: number;
    recomendation: string;
  };
  status: VisitStatus;
};

export type { PatientPersonalVisit };
