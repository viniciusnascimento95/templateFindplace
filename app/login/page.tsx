"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Apple, Loader2, Mail } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Schema de validação para Login
const loginSchema = z.object({
    email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
    password: z.string().min(1, { message: "Por favor, insira sua senha." }),
    rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
    const router = useRouter()
    const login = useAuthStore((state) => state.login)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    // Função de submissão
    async function onSubmit(data: LoginFormValues) {
        setIsLoading(true)

        try {
            // 1. Authenticate and get token
            const response = await api.post("/auth/login", {
                email: data.email,
                password: data.password,
            })

            // Assume the backend returns { access_token: "..." }
            const token = response.data.access_token || response.data.token

            if (token) {
                // Attach token briefly to api just for the next request
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                // 2. Fetch User Profile
                const profileResponse = await api.post("/auth/me")
                const user = profileResponse.data

                // 3. Save to Store
                login(user, token)
                toast.success("Login realizado com sucesso!")

                // 4. Redirect based on role
                if (user.role === "ADMIN") router.push("/dashboard/admin")
                else if (user.role === "VENUE_OWNER") router.push("/dashboard/owner")
                else router.push("/locais") // ORGANIZER or default
            } else {
                toast.error("Erro ao realizar login. Tente novamente.")
            }
        } catch (error) {
            console.error(error)
            toast.error("Falha no login. Verifique suas credenciais.")
        } finally {
            setIsLoading(false)
        }
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
                            &ldquo;Gerenciar meus eventos nunca foi tão simples. O painel é incrível.&rdquo;
                        </p>
                        <footer className="text-sm">Sofia Davis</footer>
                    </blockquote>
                </div>
            </div>

            {/* Lado direito (Formulário) */}
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo de volta</h1>
                        <p className="text-sm text-muted-foreground">
                            Entre com seu e-mail e senha para acessar sua conta
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
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Senha</Label>
                                        <Link
                                            href="/forgot-password"
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            Esqueceu a senha?
                                        </Link>
                                    </div>
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

                                <Button disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Entrar
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
                        Não tem uma conta?{" "}
                        <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                            Crie agora
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
