'use client'

import { Droplets, Calendar, Ruler } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Cultivo } from '@/lib/cultivos-data'

interface CultivoCardProps {
  cultivo: Cultivo
  onClick: () => void
  isInHuerta?: boolean
}

export function CultivoCard({ cultivo, onClick, isInHuerta }: CultivoCardProps) {
  return (
    <Card 
      className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-primary/50 relative overflow-hidden"
      onClick={onClick}
    >
      {isInHuerta && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            En mi huerta
          </Badge>
        </div>
      )}
      
      <CardContent className="p-5">
        {/* Emoji y nombre */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-3xl transition-transform group-hover:scale-110">
            {cultivo.emoji}
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">{cultivo.nombre}</h3>
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
              {cultivo.dificultad}
            </Badge>
          </div>
        </div>

        {/* Badges con info */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1.5 bg-muted text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {cultivo.siembra}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1.5 bg-muted text-muted-foreground">
            <Droplets className="h-3 w-3" />
            {cultivo.riego}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1.5 bg-muted text-muted-foreground">
            <Ruler className="h-3 w-3" />
            {cultivo.espacio}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
