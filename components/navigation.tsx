'use client'

import { Leaf, BookOpen, Sprout, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/use-theme'

export type View = 'catalogo' | 'detalle' | 'mi-huerta'

interface NavigationProps {
  currentView: View
  onNavigate: (view: View) => void
  huertaCount: number
}

export function Navigation({ currentView, onNavigate, huertaCount }: NavigationProps) {
  const { theme, toggleTheme, mounted } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button
          onClick={() => onNavigate('catalogo')}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="h-5 w-5" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold leading-tight text-foreground">La Huerta</h1>
            <p className="text-xs text-muted-foreground">en pantalla</p>
          </div>
        </button>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onNavigate('catalogo')}
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              currentView === 'catalogo' || currentView === 'detalle'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Agregar Planta</span>
          </button>

          <button
            onClick={() => onNavigate('mi-huerta')}
            className={cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              currentView === 'mi-huerta'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <Sprout className="h-4 w-4" />
            <span className="hidden sm:inline">Mi Huerta</span>
            {huertaCount > 0 && (
              <span className={cn(
                'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold',
                currentView === 'mi-huerta'
                  ? 'bg-primary-foreground text-primary'
                  : 'bg-primary text-primary-foreground'
              )}>
                {huertaCount}
              </span>
            )}
          </button>

          {/* Separador */}
          <div className="mx-2 h-6 w-px bg-border" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
          >
            {mounted && (
              theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
