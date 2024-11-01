import {z, ZodType} from "zod";

type DoctorRegisterFormData = {
    firstName: string;
    lastName: string
    email: string;
    password: string;
    proffesion: string
    education: string;
}

const schema: ZodType<DoctorRegisterFormData> = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    proffesion: z.string().min(1),
    education: z.string().min(1)
});

const defaultValues: DoctorRegisterFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: "",
    education: "",
    proffesion: ""
}

export type {DoctorRegisterFormData}
export {schema, defaultValues}