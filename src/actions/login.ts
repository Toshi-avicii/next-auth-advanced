"use server";
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { signIn } from '../../auth';
import { DEFAULT_LOGIN_REDIRECT } from '../../routes';
import { AuthError } from 'next-auth';
export const login = async(values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    console.log(validatedFields.success);
    if(!validatedFields.success) {
        return {
            error: "Invalid fields!"
        }
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch(err) {
        if(err instanceof AuthError) {
            switch (err.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" }
            
                default:
                    return { error: "Something went wrong!" }
            }
        }

        throw err;
    }

    return {
        success: "Email sent!"
    }
}