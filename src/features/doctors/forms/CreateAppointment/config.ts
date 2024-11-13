import { date, z, ZodType } from "zod";
import CreateAppointmentFormData from "./types";

const schema: ZodType<CreateAppointmentFormData> = z.object({
  date: z.date(),
  procedure: z.string().min(1),
});

const defaultValues: CreateAppointmentFormData = {
  date: new Date(),
  procedure: "",
};

export { schema, defaultValues };
