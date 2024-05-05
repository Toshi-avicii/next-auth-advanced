import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is invalid'
    }).trim(),
    password: z.string().min(1, {
        message: "Password is required"
    }).trim()
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is invalid'
    }).trim(),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }).trim(),
    name: z.string().min(1, {
        message: 'Name is required'
    })
});