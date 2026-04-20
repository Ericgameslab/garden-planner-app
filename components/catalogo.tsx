'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { CultivoCard } from '@/components/cultivo-card'
import { cultivos, type Cultivo } from '@/lib/cultivos-data'
import type { CultivoEnHuerta } from '@/lib/huerta-types'

interface CatalogoProps {
  onSelectCultivo: (cultivo: Cultivo) => void
  huertaCultivos: CultivoEnHuerta[]
}

export function Catalogo({ onSelectCultivo, huertaCultivos }: CatalogoProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCultivos = cultivos.filter(cultivo =>
    cultivo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cultivo.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const isInHuerta = (cultivoId: string) => 
    huertaCultivos.some(c => c.cultivoId === cultivoId)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl text-balance">
          Catálogo de Cultivos
        </h2>
        <p className="text-muted-foreground text-pretty">
          Explorá los cultivos ideales para tu huerta urbana en Buenos Aires. 
          Tocá cualquiera para ver más detalles.
        </p>
      </div>

      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar cultivos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Grid de cultivos */}
      {filteredCultivos.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCultivos.map(cultivo => (
            <CultivoCard
              key={cultivo.id}
              cultivo={cultivo}
              onClick={() => onSelectCultivo(cultivo)}
              isInHuerta={isInHuerta(cultivo.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-muted-foreground">
            No encontramos cultivos con &quot;{searchTerm}&quot;
          </p>
        </div>
      )}
    </div>
  )
}
