"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Loader2, Users } from "lucide-react"
import { useEffect, useState } from "react"

interface Inquiry {
    id: number
    desiredDate: string
    guestCount: number
    message: string
    venue: {
        id: number
        name: string
    }
}

export default function MyInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadInquiries() {
            try {
                const response = await api.get("/inquiries/sent")
                setInquiries(response.data)
            } catch (err) {
                console.error("Erro ao carregar pedidos", err)
            } finally {
                setLoading(false)
            }
        }
        loadInquiries()
    }, [])

    return (
        <AuthGuard allowedRoles={["ORGANIZER", "ADMIN"]}>
            <main className="container mx-auto px-4 py-8 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Minhas Solicitações de Orçamento</h1>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : inquiries.length === 0 ? (
                    <div className="text-center p-12 border rounded-lg bg-muted/50">
                        <h3 className="text-lg font-medium">Você ainda não enviou nenhuma solicitação.</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {inquiries.map((inq) => (
                            <Card key={inq.id}>
                                <CardHeader>
                                    <CardTitle>{inq.venue.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {format(new Date(inq.desiredDate), "PPP", { locale: ptBR })}
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Users className="mr-2 h-4 w-4" />
                                        {inq.guestCount} convidados
                                    </div>
                                    <div className="text-sm bg-muted p-3 rounded-md mt-2">
                                        <p className="line-clamp-3">{inq.message}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </AuthGuard>
    )
}
