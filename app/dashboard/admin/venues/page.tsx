"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { ApiVenue } from "@/components/venue-list"
import { api } from "@/lib/api"
import { ArrowLeft, CheckCircle, Loader2, MapPin, XCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface AdminVenue extends ApiVenue {
    status?: string // 'PENDING', 'APPROVED', 'REJECTED'
}

export default function AdminVenuesPage() {
    const [venues, setVenues] = useState<AdminVenue[]>([])
    const [loading, setLoading] = useState(true)

    async function fetchVenues() {
        try {
            const response = await api.get("/venues")
            setVenues(response.data)
        } catch (err) {
            console.error("Erro ao carregar espaços", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVenues()
    }, [])

    async function handleApprove(id: string | number) {
        try {
            await api.patch(`/admin/venues/${id}/approve`)
            toast.success("Espaço aprovado com sucesso!")
            fetchVenues()
        } catch (err) {
            console.error(err)
            toast.error("Erro ao aprovar espaço. Verifique console.")
        }
    }

    async function handleReject(id: string | number) {
        try {
            await api.patch(`/admin/venues/${id}/reject`)
            toast.success("Espaço rejeitado.")
            fetchVenues()
        } catch (err) {
            console.error(err)
            toast.error("Erro ao rejeitar espaço. Verifique console.")
        }
    }

    return (
        <AuthGuard allowedRoles={["ADMIN"]}>
            <main className="container mx-auto px-4 py-8 min-h-screen">
                <Link href="/dashboard/admin" className="inline-flex items-center text-sm mb-6 text-muted-foreground hover:text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para o Painel
                </Link>
                <h1 className="text-3xl font-bold mb-6">Gerenciamento de Espaços</h1>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : venues.length === 0 ? (
                    <div className="text-center p-12 border rounded-lg bg-muted/50">
                        <h3 className="text-lg font-medium">Nenhum espaço encontrado.</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {venues.map((venue) => (
                            <Card key={venue.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-start">
                                        <span>{venue.name}</span>
                                        {/* Se o backend não enviar status, assume-se que está sendo listado e trataremos aqui visualmente apenas */}
                                        {(venue.status === "PENDING" || !venue.status) && (
                                            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Pendente</span>
                                        )}
                                        {venue.status === "APPROVED" && (
                                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Aprovado</span>
                                        )}
                                        {venue.status === "REJECTED" && (
                                            <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">Rejeitado</span>
                                        )}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 space-y-4">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        {venue.city}, {venue.state}
                                    </div>
                                    <p className="text-sm line-clamp-3 bg-muted p-2 rounded">{venue.description}</p>
                                    <div className="text-sm">
                                        <strong>Capacidade:</strong> {venue.capacity} <br />
                                        <strong>Preço Base:</strong> R$ {Number(venue.basePrice).toLocaleString('pt-BR')}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2 border-t pt-4">
                                    {(!venue.status || venue.status === "PENDING") ? (
                                        <>
                                            <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleReject(venue.id)}>
                                                <XCircle className="h-4 w-4 mr-1" /> Rejeitar
                                            </Button>
                                            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleApprove(venue.id)}>
                                                <CheckCircle className="h-4 w-4 mr-1" /> Aprovar
                                            </Button>
                                        </>
                                    ) : (
                                        <span className="text-sm text-muted-foreground">Revisão Concluída</span>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </AuthGuard>
    )
}
