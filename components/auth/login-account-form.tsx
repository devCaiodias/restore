'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

// Montando a logica de validação
const formSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Must be a valid email."
    }),
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "Password must have at least 6 characters"
    }).max(12, {
        message: "Password must have at max 12 characters"
    })
})

export default function LoginAccontForm() {
    const router = useRouter()
    // tratando os dados para o formulario
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        // logica para fazer login
        try {
            const supabase = createClientComponentClient()
            const {email, password} = values

            const {error, data: { session }} = await supabase.auth.signInWithPassword({
                email, password
            })

            form.reset()
            router.refresh()
        } catch (error) {
            console.log("LoginAccontForm " + error)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center space-y-2">
            <span className="text-lg">Login your account</span>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
                    <FormField control={form.control} name="email" render={({field}) => (
                        <FormItem className="m-3">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="E-mail" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your E-mail
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="password" render={({field}) => (
                        <FormItem className="m-3">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your Password
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <Button className="m-2" type="submit">Login Account</Button>
                </form>
            </Form>
        </div>
    )
}