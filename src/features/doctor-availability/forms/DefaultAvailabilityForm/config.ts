import { z, ZodType } from "zod";

export type DefaultAvailabilityFormData = {
  schedule: any[];
  durationInMinutes: number;
};

export const schema: ZodType<DefaultAvailabilityFormData> = z.object({
  schedule: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        start: z.date(),
        end: z.date(),
      })
    )
    .min(1, "Musi być wybrany co najmniej 1 dzień."),
  durationInMinutes: z.number().min(10).max(1440),
});

export const defaultValues: DefaultAvailabilityFormData = {
  schedule: [],
  durationInMinutes: 30,
};
