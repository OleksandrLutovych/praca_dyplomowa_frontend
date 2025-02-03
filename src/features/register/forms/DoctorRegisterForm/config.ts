import { z, ZodType } from "zod";

type DoctorRegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const schema: ZodType<DoctorRegisterFormData> = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

const defaultValues: DoctorRegisterFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export type { DoctorRegisterFormData };
export { schema, defaultValues };
