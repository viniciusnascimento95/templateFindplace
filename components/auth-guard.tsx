"use client"

import { Role, useAuthStore } from "@/store/authStore"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface AuthGuardProps {
    children: React.ReactNode
    allowedRoles?: Role[]
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
    const router = useRouter()
    const user = useAuthStore((state) => state.user)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (isMounted) {
            if (!user) {
                router.push("/login")
            } else if (allowedRoles && !allowedRoles.includes(user.role)) {
                // Redireciona usuários logados que tentam acessar rotas não permitidas
                if (user.role === "ADMIN") {
                    router.push("/dashboard/admin")
                } else if (user.role === "VENUE_OWNER") {
                    router.push("/dashboard/owner")
                } else {
                    router.push("/locais") // ORGANIZER return path
                }
            }
        }
    }, [user, allowedRoles, router, isMounted])

    // Prevent hydration errors and render a loader before auth logic is ready
    if (!isMounted) return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    )

    if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
        return null // We are redirecting
    }

    return <>{children}</>
}
