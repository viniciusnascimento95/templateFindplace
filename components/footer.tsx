import Link from "next/link"
import { MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">FindePlace</span>
            </Link>
            <p className="text-muted-foreground">
              Encontre o local perfeito para o seu evento, seja ele corporativo, casamento, reunião ou treinamento.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/locais" className="text-muted-foreground hover:text-foreground">
                  Locais
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="text-muted-foreground hover:text-foreground">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-foreground">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/locais?categoria=corporativo" className="text-muted-foreground hover:text-foreground">
                  Eventos Corporativos
                </Link>
              </li>
              <li>
                <Link href="/locais?categoria=casamento" className="text-muted-foreground hover:text-foreground">
                  Casamentos
                </Link>
              </li>
              <li>
                <Link href="/locais?categoria=treinamento" className="text-muted-foreground hover:text-foreground">
                  Treinamentos
                </Link>
              </li>
              <li>
                <Link href="/locais?categoria=reuniao" className="text-muted-foreground hover:text-foreground">
                  Reuniões
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">contato@findeplace.com.br</li>
              <li className="text-muted-foreground">(11) 99999-9999</li>
              <li className="text-muted-foreground">São Paulo, SP</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} FindePlace. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
