'use client';

import { useForm } from "react-hook-form"
import CardWrapper from "./CardWrapper"
import { RegisterSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import * as z from 'zod';
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";

function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
        email: '',
        password: '',
        name: ''
    }
  });

  const submitHandler = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
        register(values).then((data) => {
            setError(data.error);
            setSuccess(data.success);
        })
    })
  }

  return (
    <CardWrapper 
        backBtnHref="/auth/login"
        backBtnLabel="Already have an account?"
        headerLabel="Create an account"
        showSocial
    >
      <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-6"
        >
            <div className="space-y-4">
                <FormField 
                    control={form.control}
                    name="name"
                    disabled={isPending}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="your name" type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="space-y-4">
                <FormField 
                    control={form.control}
                    name="email"
                    disabled={isPending}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="your email" type="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="space-y-4">
                <FormField 
                    control={form.control}
                    disabled={isPending}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="your password" type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={isPending}>
                Register
            </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm
