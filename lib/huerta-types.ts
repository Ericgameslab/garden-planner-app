export interface CultivoEnHuerta {
  cultivoId: string
  fechaAgregado: string // ISO date string
  plantado: boolean
  fechaPlantado?: string // ISO date string cuando se marcó como plantado
}

export interface HuertaState {
  cultivos: CultivoEnHuerta[]
}
