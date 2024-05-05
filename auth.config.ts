import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcryptjs from 'bcryptjs';

export default {
    providers: [
        Credentials({
            authorize: async(credentials) => {
                const validatedFields = LoginSchema.safeParse(credentials);
                if(validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if(!user || !user.password) return null;
                    
                    const passwordsMatch = await bcryptjs.compare(password, user.password);

                    if(passwordsMatch) return user;
                }

                return null;
            }
        })
    ]
} satisfies NextAuthConfig;