import { z, ZodType } from "zod";

type LeaveFeedbackFormData = {
  ranking: number ;
  comment: string;
};

const schema: ZodType<LeaveFeedbackFormData> = z.object({
  ranking: z.number(),
  comment: z.string(),
});
const defaultValues: LeaveFeedbackFormData = {
  comment: "",
  ranking: 4,
};

export { schema, defaultValues };
export type { LeaveFeedbackFormData };
