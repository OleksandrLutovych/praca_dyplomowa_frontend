import { SimpleUser } from "../../../entities/user/types";
import { VisitSubType, VisitType } from "../../../entities/visits/enums";

type Visit = {
  date: Date;
  place: string;
  type: VisitType;
  subType: VisitSubType;
  doctor: { user: SimpleUser };
  service: { service: string; price: number; recomendation: string };
};

export type { Visit };
