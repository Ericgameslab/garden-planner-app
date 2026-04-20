'use client'

import { Sprout, Calendar, Trash2, CheckCircle2, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { getCultivoById } from '@/lib/cultivos-data'
import type { CultivoEnHuerta } from '@/lib/huerta-types'

interface MiHuertaProps {
  cultivos: CultivoEnHuerta[]
  onTogglePlantado: (cultivoId: string) => void
  onRemove: (cultivoId: string) => void
  onViewCultivo: (cultivoId: string) => void
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export function MiHuerta({ cultivos, onTogglePlantado, onRemove, onViewCultivo }: MiHuertaProps) {
  const plantados = cultivos.filter(c => c.plantado)
  const pendientes = cultivos.filter(c => !c.plantado)

  if (cultivos.length === 0) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Mi Huerta</h2>
          <p className="text-muted-foreground">Tus cultivos planificados aparecerán acá.</p>
        </div>

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Sprout className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">Tu huerta está vacía</h3>
            <p className="mb-4 max-w-sm text-muted-foreground">
              Explorá el catálogo y agregá los cultivos que querés plantar. 
              ¡Tu huerta va a quedar guardada aunque cierres la página!
            </p>
            <div className="text-4xl">🌱</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Mi Huerta</h2>
        <p className="text-muted-foreground">
          Tenés {cultivos.length} cultivo{cultivos.length !== 1 ? 's' : ''} en tu huerta. 
          Marcá los que ya plantaste.
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{plantados.length}</p>
              <p className="text-sm text-muted-foreground">Plantados</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-secondary/30 bg-secondary/10">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/20">
              <Circle className="h-6 w-6 text-secondary-foreground/70" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendientes.length}</p>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de cultivos */}
      <div className="space-y-3">
        {cultivos.map(item => {
          const cultivo = getCultivoById(item.cultivoId)
          if (!cultivo) return null

          return (
            <Card 
              key={item.cultivoId}
              className={item.plantado ? 'border-primary/30 bg-primary/5' : ''}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className="pt-1">
                    <Checkbox
                      id={`planted-${item.cultivoId}`}
                      checked={item.plantado}
                      onCheckedChange={() => onTogglePlantado(item.cultivoId)}
                      className="h-6 w-6"
                    />
                  </div>

                  {/* Info del cultivo */}
                  <button
                    onClick={() => onViewCultivo(item.cultivoId)}
                    className="flex flex-1 items-center gap-3 text-left transition-opacity hover:opacity-80"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
                      {cultivo.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-foreground ${item.plantado ? 'line-through opacity-70' : ''}`}>
                        {cultivo.nombre}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Agregado: {formatDate(item.fechaAgregado)}</span>
                      </div>
                      {item.plantado && item.fechaPlantado && (
                        <div className="flex items-center gap-2 text-sm text-primary">
                          <Sprout className="h-3.5 w-3.5" />
                          <span>Plantado: {formatDate(item.fechaPlantado)}</span>
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Botón eliminar */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => onRemove(item.cultivoId)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar {cultivo.nombre}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
