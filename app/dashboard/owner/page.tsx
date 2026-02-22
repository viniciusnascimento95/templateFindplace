"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Loader2, Users } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface ReceivedInquiry {
    id: number
    desiredDate: string
    guestCount: number
    message: string
    venue: {
        id: number
        name: string
    }
}

export default function OwnerDashboardPage() {
    const [inquiries, setInquiries] = useState<ReceivedInquiry[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadInquiries() {
            try {
                const response = await api.get("/inquiries/received")
                setInquiries(response.data)
            } catch (err) {
                console.error("Erro ao carregar mensagens recebidas", err)
            } finally {
                setLoading(false)
            }
        }
        loadInquiries()
    }, [])

    return (
        <AuthGuard allowedRoles={["VENUE_OWNER", "ADMIN"]}>
            <main className="container mx-auto px-4 py-8 min-h-screen">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold">Painel do Dono de Espaço</h1>
                    <div className="flex gap-2">
                        <Link href="/dashboard/owner/venues/my-list">
                            <Button variant="outline">Meus Espaços</Button>
                        </Link>
                        <Link href="/dashboard/owner/venues/create">
                            <Button>Cadastrar Novo Espaço</Button>
                        </Link>
                    </div>
                </div>

                <h2 className="text-xl font-semibold mb-4">Pedidos de Orçamento Recebidos</h2>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : inquiries.length === 0 ? (
                    <div className="text-center p-12 border rounded-lg bg-muted/50">
                        <h3 className="text-lg font-medium">Nenhum pedido de orçamento recebido ainda.</h3>
                        <p className="text-muted-foreground mt-2">Quando organizadores entrarem em contato com seus espaços, aparecerá aqui.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {inquiries.map((inq) => (
                            <Card key={inq.id}>
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-start">
                                        <span>Espaço: {inq.venue.name}</span>
                                        <span className="text-xs font-normal px-2 py-1 bg-primary/10 text-primary rounded-full">
                                            Novo Contato
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {format(new Date(inq.desiredDate), "PPP", { locale: ptBR })}
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Users className="mr-2 h-4 w-4" />
                                            {inq.guestCount} convidados
                                        </div>
                                    </div>
                                    <div className="text-sm bg-muted p-4 rounded-md mt-2">
                                        <p className="font-semibold mb-1">Mensagem do Organizador:</p>
                                        <p className="whitespace-pre-wrap">{inq.message}</p>
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
