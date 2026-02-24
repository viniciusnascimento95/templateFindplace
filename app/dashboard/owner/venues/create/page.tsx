"use client"

import { AuthGuard } from "@/components/auth-guard"
import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { toast } from "sonner"

const venueSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres."),
    description: z.string().min(10, "Forneça uma descrição mais detalhada."),
    capacity: z.coerce.number().min(1, "Capacidade deve ser maior que zero."),
    basePrice: z.coerce.number().min(0, "Preço base inválido."),
    street: z.string().min(3, "Rua é obrigatória."),
    city: z.string().min(2, "Cidade é obrigatória."),
    state: z.string().length(2, "Estado deve ter 2 letras (Ex: SP)."),
    zipCode: z.string().min(8, "CEP inválido."),
    images: z.any().optional(),
})

type VenueFormValues = z.infer<typeof venueSchema>

export default function CreateVenuePage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<VenueFormValues>({
        resolver: zodResolver(venueSchema),
        defaultValues: {
            name: "",
            description: "",
            capacity: 0,
            basePrice: 0,
            street: "",
            city: "",
            state: "",
            zipCode: "",
            images: undefined,
        },
    })

    async function onSubmit(data: VenueFormValues) {
        setIsSubmitting(true)

        try {
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("description", data.description)
            formData.append("capacity", data.capacity.toString())
            formData.append("basePrice", data.basePrice.toString())
            formData.append("street", data.street)
            formData.append("city", data.city)
            formData.append("state", data.state.toUpperCase())
            formData.append("zipCode", data.zipCode)

            if (data.images && data.images.length > 0) {
                // Using Array.from to iterate over FileList
                Array.from(data.images).forEach((file: any) => {
                    formData.append("images", file)
                })
            }

            await api.post("/venues", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            toast.success("Espaço cadastrado com sucesso! Aguardando aprovação.")
            router.push("/dashboard/owner")
        } catch (error) {
            console.error(error)
            toast.error("Erro ao cadastrar espaço. Verifique os dados e tente novamente.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AuthGuard allowedRoles={["VENUE_OWNER", "ADMIN"]}>
            <main className="container mx-auto px-4 py-8 min-h-screen">
                <Link href="/dashboard/owner" className="inline-flex items-center text-sm mb-6 text-muted-foreground hover:text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para o Painel
                </Link>

                <h1 className="text-3xl font-bold mb-6">Cadastrar Novo Espaço</h1>

                <div className="max-w-2xl border rounded-lg p-6 bg-card">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium border-b pb-2">Informações Principais</h3>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nome do Espaço</Label>
                                <Input id="name" placeholder="Ex: Salão Estrela" disabled={isSubmitting} {...form.register("name")} />
                                {form.formState.errors.name && (
                                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea id="description" placeholder="Descreva os diferenciais do seu espaço..." disabled={isSubmitting} {...form.register("description")} />
                                {form.formState.errors.description && (
                                    <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="capacity">Capacidade (Pessoas)</Label>
                                    <Input id="capacity" type="number" disabled={isSubmitting} {...form.register("capacity")} />
                                    {form.formState.errors.capacity && (
                                        <p className="text-sm text-red-500">{form.formState.errors.capacity.message}</p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="basePrice">Preço Base (R$)</Label>
                                    <Input id="basePrice" type="number" step="0.01" disabled={isSubmitting} {...form.register("basePrice")} />
                                    {form.formState.errors.basePrice && (
                                        <p className="text-sm text-red-500">{form.formState.errors.basePrice.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium border-b pb-2">Endereço</h3>
                            <div className="grid gap-2">
                                <Label htmlFor="street">Rua/Avenida e Número</Label>
                                <Input id="street" placeholder="Ex: Rua das Flores, 123" disabled={isSubmitting} {...form.register("street")} />
                                {form.formState.errors.street && (
                                    <p className="text-sm text-red-500">{form.formState.errors.street.message}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="city">Cidade</Label>
                                    <Input id="city" placeholder="Ex: São Paulo" disabled={isSubmitting} {...form.register("city")} />
                                    {form.formState.errors.city && (
                                        <p className="text-sm text-red-500">{form.formState.errors.city.message}</p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="state">Estado (UF)</Label>
                                    <Input id="state" placeholder="Ex: SP" maxLength={2} disabled={isSubmitting} {...form.register("state")} />
                                    {form.formState.errors.state && (
                                        <p className="text-sm text-red-500">{form.formState.errors.state.message}</p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="zipCode">CEP</Label>
                                    <Input id="zipCode" placeholder="Ex: 01000-000" disabled={isSubmitting} {...form.register("zipCode")} />
                                    {form.formState.errors.zipCode && (
                                        <p className="text-sm text-red-500">{form.formState.errors.zipCode.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium border-b pb-2">Mídia</h3>
                            <div className="grid gap-2">
                                <Label htmlFor="images">Imagens (até 10)</Label>
                                <Input id="images" type="file" multiple accept="image/*" disabled={isSubmitting} {...form.register("images")} />
                                {form.formState.errors.images && (
                                    <p className="text-sm text-red-500">{form.formState.errors.images.message as string}</p>
                                )}
                            </div>
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submeter Espaço
                        </Button>
                    </form>
                </div>
            </main>
        </AuthGuard>
    )
}
