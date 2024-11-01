import {z} from 'zod';
import {Roles} from "../../../../entities/user/enums.ts";

type FinalRegisterFormData = {
    role: Roles
}

const schema = z.object({
    role: z.nativeEnum(Roles)
});

const defaultValues: FinalRegisterFormData = {
    role: Roles.PATIENT,
};


export {schema, defaultValues};
export type {FinalRegisterFormData};