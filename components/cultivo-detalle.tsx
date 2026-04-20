'use client'

import { ArrowLeft, Droplets, Calendar, Ruler, Lightbulb, Users, Plus, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Cultivo } from '@/lib/cultivos-data'

interface CultivoDetalleProps {
  cultivo: Cultivo
  onBack: () => void
  onAddToHuerta: (cultivoId: string) => void
  isInHuerta: boolean
}

export function CultivoDetalle({ cultivo, onBack, onAddToHuerta, isInHuerta }: CultivoDetalleProps) {
  return (
    <div className="space-y-6">
      {/* Header con botón volver */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Volver al catálogo</span>
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-4xl">
            {cultivo.emoji}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{cultivo.nombre}</h2>
            <Badge 
              variant="outline" 
              className={
                cultivo.dificultad === 'Fácil' 
                  ? 'border-green-500/50 text-green-700 bg-green-50 dark:border-green-400/50 dark:text-green-300 dark:bg-green-950/50' 
                  : cultivo.dificultad === 'Medio'
                  ? 'border-yellow-500/50 text-yellow-700 bg-yellow-50 dark:border-yellow-400/50 dark:text-yellow-300 dark:bg-yellow-950/50'
                  : 'border-orange-500/50 text-orange-700 bg-orange-50 dark:border-orange-400/50 dark:text-orange-300 dark:bg-orange-950/50'
              }
            >
              Dificultad: {cultivo.dificultad}
            </Badge>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
        {cultivo.descripcion}
      </p>

      {/* Datos clave */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Siembra en CABA</p>
              <p className="font-semibold text-foreground">{cultivo.siembra}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-50/50 dark:border-blue-400/30 dark:bg-blue-950/30">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/50">
              <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Frecuencia de riego</p>
              <p className="font-semibold text-foreground">{cultivo.riego}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-500/20 bg-amber-50/50 dark:border-amber-400/30 dark:bg-amber-950/30">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/50">
              <Ruler className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Espacio entre plantas</p>
              <p className="font-semibold text-foreground">{cultivo.espacio}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consejos */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
            Consejos para cultivar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {cultivo.consejos.map((consejo, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{consejo}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Compañeros */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-primary" />
            Buenos compañeros de huerta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {cultivo.companeros.map(companero => (
              <Badge key={companero} variant="secondary" className="text-sm">
                {companero}
              </Badge>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Estos cultivos crecen bien junto a {cultivo.nombre.toLowerCase()} y pueden beneficiarse mutuamente.
          </p>
        </CardContent>
      </Card>

      {/* Botón agregar */}
      <div className="sticky bottom-4 pt-4">
        <Button
          size="lg"
          className="w-full text-lg h-14 rounded-xl shadow-lg"
          onClick={() => onAddToHuerta(cultivo.id)}
          disabled={isInHuerta}
        >
          {isInHuerta ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              Ya está en tu huerta
            </>
          ) : (
            <>
              <Plus className="mr-2 h-5 w-5" />
              Agregar a mi huerta
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
