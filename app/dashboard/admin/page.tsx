"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"
import { Inbox, Loader2, MapPin, Users } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface DashboardMetrics {
    venues: {
        total: number
        pending: number
    }
    inquiries: {
        total: number
    }
    users: {
        total: number
    }
}

export default function AdminDashboardPage() {
    const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchMetrics() {
            try {
                const response = await api.get("/admin/dashboard")
                setMetrics(response.data)
            } catch (err) {
                console.error("Erro ao carregar métricas Admin", err)
            } finally {
                setLoading(false)
            }
        }
        fetchMetrics()
    }, [])

    return (
        <AuthGuard allowedRoles={["ADMIN"]}>
            <main className="container mx-auto px-4 py-8 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Painel Administrativo</h1>
                    <Link href="/dashboard/admin/venues">
                        <Button>Analisar Novos Espaços</Button>
                    </Link>
                </div>

                {loading || !metrics ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total de Espaços
                                </CardTitle>
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{metrics.venues.total}</div>
                            </CardContent>
                        </Card>
                        <Card className="border-primary/50 bg-primary/5">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Espaços Pendentes
                                </CardTitle>
                                <MapPin className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">{metrics.venues.pending}</div>
                                <p className="text-xs text-muted-foreground mt-1">Aguardando aprovação</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Mensagens Trocadas (Inquiries)
                                </CardTitle>
                                <Inbox className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{metrics.inquiries.total}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Usuários Registrados
                                </CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{metrics.users.total}</div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </main>
        </AuthGuard>
    )
}
