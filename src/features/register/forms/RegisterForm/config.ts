import {z, ZodType} from 'zod';

type InitialRegisterFormData = {
    firstName: string;
    lastName: string
    email: string;
    password: string;
}

const schema: ZodType<InitialRegisterFormData> = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
});

const defaultValues: InitialRegisterFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

export {schema, defaultValues};
export type {InitialRegisterFormData};