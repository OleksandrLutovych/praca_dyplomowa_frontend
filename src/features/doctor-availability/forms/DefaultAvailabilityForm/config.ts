import { z, ZodType } from "zod";

export type DefaultAvailabilityFormData = {
  start: Date;
  end: Date;
  durationInMinutes: number;
};

export const schema: ZodType<DefaultAvailabilityFormData> = z.object({
  durationInMinutes: z.number().min(10).max(1440),
  start: z.date(),
  end: z.date(),
});

export const defaultValues = (
  start: Date,
  end: Date
): DefaultAvailabilityFormData => {
  return {
    durationInMinutes: 30,
    start,
    end,
  };
};
