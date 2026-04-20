'use client'

import { useState, useEffect } from 'react'
import { Navigation, type View } from '@/components/navigation'
import { Catalogo } from '@/components/catalogo'
import { CultivoDetalle } from '@/components/cultivo-detalle'
import { MiHuerta } from '@/components/mi-huerta'
import { getCultivoById, type Cultivo } from '@/lib/cultivos-data'
import type { CultivoEnHuerta } from '@/lib/huerta-types'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

const STORAGE_KEY = 'la-huerta-en-pantalla'

function loadHuertaFromStorage(): CultivoEnHuerta[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error)
  }
  return []
}

function saveHuertaToStorage(cultivos: CultivoEnHuerta[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cultivos))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export default function HuertaApp() {
  const [currentView, setCurrentView] = useState<View>('catalogo')
  const [selectedCultivo, setSelectedCultivo] = useState<Cultivo | null>(null)
  const [huertaCultivos, setHuertaCultivos] = useState<CultivoEnHuerta[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar desde localStorage al montar
  useEffect(() => {
    const stored = loadHuertaFromStorage()
    setHuertaCultivos(stored)
    setIsLoaded(true)
  }, [])

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    if (isLoaded) {
      saveHuertaToStorage(huertaCultivos)
    }
  }, [huertaCultivos, isLoaded])

  const handleNavigate = (view: View) => {
    setCurrentView(view)
    if (view === 'catalogo') {
      setSelectedCultivo(null)
    }
  }

  const handleSelectCultivo = (cultivo: Cultivo) => {
    setSelectedCultivo(cultivo)
    setCurrentView('detalle')
  }

  const handleAddToHuerta = (cultivoId: string) => {
    const cultivo = getCultivoById(cultivoId)
    if (!cultivo) return

    // Verificar si ya existe
    if (huertaCultivos.some(c => c.cultivoId === cultivoId)) {
      toast.info(`${cultivo.nombre} ya está en tu huerta`)
      return
    }

    const newItem: CultivoEnHuerta = {
      cultivoId,
      fechaAgregado: new Date().toISOString(),
      plantado: false
    }

    setHuertaCultivos(prev => [...prev, newItem])
    toast.success(`¡${cultivo.nombre} agregado a tu huerta!`, {
      description: 'Podés verlo en la sección "Mi Huerta"'
    })
  }

  const handleTogglePlantado = (cultivoId: string) => {
    setHuertaCultivos(prev => 
      prev.map(item => {
        if (item.cultivoId === cultivoId) {
          const nowPlanted = !item.plantado
          const cultivo = getCultivoById(cultivoId)
          
          if (nowPlanted) {
            toast.success(`¡Felicitaciones! 🌱`, {
              description: `Marcaste ${cultivo?.nombre} como plantado`
            })
          }
          
          return {
            ...item,
            plantado: nowPlanted,
            fechaPlantado: nowPlanted ? new Date().toISOString() : undefined
          }
        }
        return item
      })
    )
  }

  const handleRemoveFromHuerta = (cultivoId: string) => {
    const cultivo = getCultivoById(cultivoId)
    setHuertaCultivos(prev => prev.filter(c => c.cultivoId !== cultivoId))
    toast.info(`${cultivo?.nombre} eliminado de tu huerta`)
  }

  const handleViewCultivoFromHuerta = (cultivoId: string) => {
    const cultivo = getCultivoById(cultivoId)
    if (cultivo) {
      setSelectedCultivo(cultivo)
      setCurrentView('detalle')
    }
  }

  const isInHuerta = (cultivoId: string) => 
    huertaCultivos.some(c => c.cultivoId === cultivoId)

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentView={currentView}
        onNavigate={handleNavigate}
        huertaCount={huertaCultivos.length}
      />

      <main className="container mx-auto px-4 py-6 pb-24">
        {currentView === 'catalogo' && (
          <Catalogo 
            onSelectCultivo={handleSelectCultivo}
            huertaCultivos={huertaCultivos}
          />
        )}

        {currentView === 'detalle' && selectedCultivo && (
          <CultivoDetalle
            cultivo={selectedCultivo}
            onBack={() => handleNavigate('catalogo')}
            onAddToHuerta={handleAddToHuerta}
            isInHuerta={isInHuerta(selectedCultivo.id)}
          />
        )}

        {currentView === 'mi-huerta' && (
          <MiHuerta
            cultivos={huertaCultivos}
            onTogglePlantado={handleTogglePlantado}
            onRemove={handleRemoveFromHuerta}
            onViewCultivo={handleViewCultivoFromHuerta}
          />
        )}
      </main>

      <Toaster position="bottom-center" />
    </div>
  )
}
