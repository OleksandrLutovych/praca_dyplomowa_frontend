import { z, ZodType } from "zod";

type PatientActivateFormData = {
  age: string;
  pesel: string;
  address: string;
  phone: string;
};

const schema: ZodType<PatientActivateFormData> = z.object({
  age: z.string().min(2),
  pesel: z.string().min(2),
  address: z.string().min(2),
  phone: z.string().min(2),
});

const defaultValues: PatientActivateFormData = {
  age: "",
  pesel: "",
  address: "",
  phone: "",
};

export type { PatientActivateFormData };
export { schema, defaultValues };
