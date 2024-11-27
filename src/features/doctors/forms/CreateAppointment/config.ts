import { z, ZodType } from "zod";
import { VisitSubType, VisitType } from "../../../../entities/visits/enums";
import CreateAppointmentFormData from "./types";

const schema: ZodType<CreateAppointmentFormData> = z.object({
  date: z.date(),
  type: z.nativeEnum(VisitType),
  subType: z.nativeEnum(VisitSubType),
  serviceId: z.number().min(1),
  place: z.string().min(1),
});

const defaultValues: CreateAppointmentFormData = {
  date: new Date(),
  place: "",
  serviceId: "",
  subType: VisitSubType.FIRST,
  type: VisitType.STATIONARY,
};

export { defaultValues, schema };
