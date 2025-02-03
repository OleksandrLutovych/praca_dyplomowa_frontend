import { z, ZodType } from "zod";

type DoctorActivateFormData = {
  proffesion: string;
  education: string;
  about: string;
};

const schema: ZodType<DoctorActivateFormData> = z.object({
  proffesion: z.string().min(2),
  education: z.string().min(2),
  about: z.string().min(2),
});

const defaultValues: DoctorActivateFormData = {
  proffesion: "",
  education: "",
  about: "",
};

export type { DoctorActivateFormData };
export { schema, defaultValues };
