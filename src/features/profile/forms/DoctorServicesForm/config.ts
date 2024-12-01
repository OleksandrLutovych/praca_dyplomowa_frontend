import { z, ZodType } from "zod";
import DoctorServiceFormData from "./types";

const schema: ZodType<DoctorServiceFormData> = z.object({
  service: z.string().min(1),
  price: z.number().min(1),
  recomendation: z.string().min(1),
});

const defaultValues: DoctorServiceFormData = {
  service: "",
  price: 100,
  recomendation: "",
};

export { defaultValues, schema };
