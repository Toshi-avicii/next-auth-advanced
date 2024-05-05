'use client';

import { useForm } from "react-hook-form"
import CardWrapper from "./CardWrapper"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import * as z from 'zod';
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";

function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
        email: '',
        password: ''
    }
  });

  const submitHandler = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
        login(values).then((data) => {
            setError(data.error);
            setSuccess(data.success);
        })
    })
  }

  return (
    <CardWrapper 
        backBtnHref="/auth/register"
        backBtnLabel="Don't have an account?"
        headerLabel="Welcome back"
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
            {
                error &&
                <FormError message={error} />
            }
            {
                success && 
                <FormSuccess message={success} />
            }
            <Button type="submit" className="w-full" disabled={isPending}>
                Login
            </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm
