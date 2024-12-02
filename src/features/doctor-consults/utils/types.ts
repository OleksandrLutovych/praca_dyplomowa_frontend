import { DoctorService } from "../../../entities/doctor-service/types";
import { Patient } from "../../../entities/patient/types";
import { VisitSubType, VisitType } from "../../../entities/visits/enums";

export type Consult = {
  id: number;
  date: Date;
  type: VisitType;
  subType: VisitSubType;
  patient: Patient;
  service: DoctorService;
  place: string;  
};
