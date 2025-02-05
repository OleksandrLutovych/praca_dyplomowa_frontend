import { z, ZodType } from "zod";

type FinishConsultFormData = {
  finishRecomendations: string;
};

const schema: ZodType<FinishConsultFormData> = z.object({
  finishRecomendations: z.string(),
});
const defaultValues: FinishConsultFormData = {
  finishRecomendations: "",
};

export { defaultValues, schema };
export type { FinishConsultFormData };
