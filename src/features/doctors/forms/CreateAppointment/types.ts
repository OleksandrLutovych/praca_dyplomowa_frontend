import { VisitSubType, VisitType } from "../../../../entities/visits/enums";

type CreateAppointmentFormData = {
  serviceId: number | "";
  date: number | Date | "";
  type: VisitType;
  subType: VisitSubType;
  place: string;
};

export default CreateAppointmentFormData;
