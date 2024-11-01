import {z, ZodType} from "zod";

type LoginFormData = {
    email: string;
    password: string;
}

type LoginResponse = {
    access_token: string
}
const defaultValues: LoginFormData = {
    email: "",
    password: ""
}


const schema: ZodType<LoginFormData> = z.object({
    email: z.string().email(),
    password: z.string()
})


export type {LoginFormData, LoginResponse}
export {defaultValues, schema}