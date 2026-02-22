"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { ApiVenue } from "@/components/venue-list"
import { api } from "@/lib/api"
import { ArrowLeft, Loader2, MapPin } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface OwnerVenue extends ApiVenue {
    status?: string // 'PENDING', 'APPROVED', 'REJECTED'
}

export default function MyVenuesPage() {
    const [venues, setVenues] = useState<OwnerVenue[]>([])
    const [loading, setLoading] = useState(true)

    async function fetchVenues() {
        try {
            // NOTE: We assume the backend returns ALL venues or we filter for now
            // Ideally this would be a GET /venues/me endpoint.
            // Assuming GET /venues returns only the venues belonging to the owner when authenticated as one
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

    return (
        <AuthGuard allowedRoles={["VENUE_OWNER", "ADMIN"]}>
            <main className="container mx-auto px-4 py-8 min-h-screen">
                <Link href="/dashboard/owner" className="inline-flex items-center text-sm mb-6 text-muted-foreground hover:text-primary">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para o Painel
                </Link>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Meus Espaços</h1>
                    <Link href="/dashboard/owner/venues/create">
                        <Button>Novo Espaço</Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : venues.length === 0 ? (
                    <div className="text-center p-12 border rounded-lg bg-muted/50">
                        <h3 className="text-lg font-medium">Você ainda não possui nenhum espaço cadastrado.</h3>
                        <p className="text-muted-foreground mt-2">Clique em "Novo Espaço" para criar seu primeiro anúncio.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {venues.map((venue) => (
                            <Card key={venue.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-start">
                                        <span>{venue.name}</span>
                                        {/* Exibir Status */}
                                        {(venue.status === "PENDING" || !venue.status) && (
                                            <span className="text-xs font-normal px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Pendente</span>
                                        )}
                                        {venue.status === "APPROVED" && (
                                            <span className="text-xs font-normal px-2 py-1 bg-green-100 text-green-800 rounded-full">Aprovado</span>
                                        )}
                                        {venue.status === "REJECTED" && (
                                            <span className="text-xs font-normal px-2 py-1 bg-red-100 text-red-800 rounded-full">Rejeitado</span>
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
                                    <Link href={`/locais/${venue.id}`}>
                                        <Button variant="outline" size="sm">Ver Página</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </AuthGuard>
    )
}
