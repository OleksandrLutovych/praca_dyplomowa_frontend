import { DoctorService } from "../../../entities/doctor-service/types";
import { Patient } from "../../../entities/patient/types";
import {
  VisitStatus,
  VisitSubType,
  VisitType,
} from "../../../entities/visits/enums";

export type Consult = {
  id: number;
  date: Date;
  type: VisitType;
  subType: VisitSubType;
  patient: Patient;
  service: DoctorService;
  place: string;
  status: VisitStatus;
  finishRecomendations?: string;
  comment?: string;
  ranking?: number;
  rejectReason?: string;
  finishedAt?: Date;
};
