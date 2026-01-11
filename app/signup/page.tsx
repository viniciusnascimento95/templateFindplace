"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Mail, Apple } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

// Schema de validação
const signUpSchema = z
    .object({
        email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
        password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres." }),
        confirmPassword: z.string(),
        terms: z.literal(true, {
            errorMap: () => ({ message: "Você deve aceitar os termos e condições." }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem.",
        path: ["confirmPassword"],
    })

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUpPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    // Função de submissão (simulada)
    async function onSubmit(data: SignUpFormValues) {
        setIsLoading(true)

        // Simulação de delay de API
        setTimeout(() => {
            console.log(data)
            setIsLoading(false)
            // Aqui você adicionaria a lógica real de cadastro
        }, 2000)
    }

    return (
        <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Lado esquerdo (Imagem/Branding) - Oculto em mobile */}
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    FindePlace
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Encontrar o lugar perfeito para o nosso evento nunca foi tão fácil. A plataforma é intuitiva e
                            segura.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis</footer>
                    </blockquote>
                </div>
            </div>

            {/* Lado direito (Formulário) */}
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Crie sua conta</h1>
                        <p className="text-sm text-muted-foreground">
                            Insira seu e-mail abaixo para criar sua conta
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-4">
                                {/* Email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input
                                        id="email"
                                        placeholder="nome@exemplo.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        disabled={isLoading}
                                        {...form.register("email")}
                                    />
                                    {form.formState.errors.email && (
                                        <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                                    )}
                                </div>

                                {/* Senha */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        disabled={isLoading}
                                        {...form.register("password")}
                                    />
                                    {form.formState.errors.password && (
                                        <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                                    )}
                                </div>

                                {/* Confirmar Senha */}
                                <div className="grid gap-2">
                                    <Label htmlFor="confirmPassword">Confirmar senha</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        disabled={isLoading}
                                        {...form.register("confirmPassword")}
                                    />
                                    {form.formState.errors.confirmPassword && (
                                        <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
                                    )}
                                </div>

                                {/* Termos (Opcional, mas comum em signup) */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="terms"
                                        onCheckedChange={(checked) => {
                                            form.setValue("terms", checked === true ? true : undefined) // undefined para falhar na validação se não marcado
                                            form.trigger("terms")
                                        }}
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Aceito os termos e condições
                                    </label>
                                </div>
                                {form.formState.errors.terms && (
                                    <p className="text-sm text-red-500">{form.formState.errors.terms.message}</p>
                                )}

                                <Button disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Criar conta com E-mail
                                </Button>
                            </div>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
                            </div>
                        </div>

                        <Button variant="outline" type="button" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Mail className="mr-2 h-4 w-4" />
                            )}{" "}
                            Google
                        </Button>

                        <Button variant="outline" type="button" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Apple className="mr-2 h-4 w-4" />
                            )}{" "}
                            Apple
                        </Button>
                    </div>

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Já tem uma conta?{" "}
                        <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                            Entrar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
