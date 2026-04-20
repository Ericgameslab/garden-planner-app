export interface Cultivo {
  id: string
  nombre: string
  emoji: string
  siembra: string
  riego: string
  espacio: string
  descripcion: string
  consejos: string[]
  companeros: string[] // Cultivos que van bien juntos
  dificultad: 'Fácil' | 'Medio' | 'Difícil'
}

export const cultivos: Cultivo[] = [
  {
    id: 'tomate',
    nombre: 'Tomate',
    emoji: '🍅',
    siembra: 'Sep - Nov',
    riego: 'Cada 2 días',
    espacio: '50 cm',
    descripcion: 'El tomate es uno de los cultivos más populares en huertas urbanas. Necesita mucho sol (6-8 horas diarias) y un buen soporte para crecer verticalmente.',
    consejos: [
      'Plantá en el lugar más soleado de tu huerta',
      'Usá tutores o jaulas para sostener la planta',
      'Quitá los brotes laterales (chupones) para mejor producción',
      'Regá por la mañana, evitando mojar las hojas'
    ],
    companeros: ['Albahaca', 'Zanahoria', 'Perejil'],
    dificultad: 'Medio'
  },
  {
    id: 'lechuga',
    nombre: 'Lechuga',
    emoji: '🥬',
    siembra: 'Mar - May / Ago - Oct',
    riego: 'Diario',
    espacio: '20 cm',
    descripcion: 'La lechuga es ideal para principiantes. Crece rápido y tolera media sombra, perfecta para balcones o espacios con luz limitada.',
    consejos: [
      'Cosechá las hojas externas para que siga produciendo',
      'Evitá el sol directo del mediodía en verano',
      'Sembrá escalonadamente cada 2 semanas para cosecha continua',
      'Mantené el suelo siempre húmedo pero no encharcado'
    ],
    companeros: ['Zanahoria', 'Rabanito', 'Espinaca'],
    dificultad: 'Fácil'
  },
  {
    id: 'zanahoria',
    nombre: 'Zanahoria',
    emoji: '🥕',
    siembra: 'Mar - Abr / Jul - Sep',
    riego: 'Cada 2 días',
    espacio: '5 cm',
    descripcion: 'Las zanahorias necesitan tierra suelta y profunda (mínimo 20 cm) para desarrollar raíces rectas y largas.',
    consejos: [
      'Aflojá bien la tierra antes de sembrar',
      'Sembrá directo en el lugar definitivo (no tolera trasplante)',
      'Ralea cuando tengan 5 cm de alto',
      'La cosecha tarda 3-4 meses, ¡paciencia!'
    ],
    companeros: ['Lechuga', 'Tomate', 'Cebolla'],
    dificultad: 'Medio'
  },
  {
    id: 'albahaca',
    nombre: 'Albahaca',
    emoji: '🌿',
    siembra: 'Sep - Dic',
    riego: 'Cada 2 días',
    espacio: '25 cm',
    descripcion: 'Aromática esencial en la cocina. Además de su uso culinario, repele insectos y es excelente compañera del tomate.',
    consejos: [
      'Pellizcá las flores para prolongar la cosecha de hojas',
      'Necesita mucho sol y calor',
      'Es muy sensible al frío, protegela en otoño',
      'Cosechá siempre desde arriba para que ramifique'
    ],
    companeros: ['Tomate', 'Pepino', 'Pimiento'],
    dificultad: 'Fácil'
  },
  {
    id: 'espinaca',
    nombre: 'Espinaca',
    emoji: '🥗',
    siembra: 'Mar - May / Ago - Sep',
    riego: 'Diario',
    espacio: '15 cm',
    descripcion: 'Verdura de hoja nutritiva que prefiere el clima fresco. Se espiga (florece) con el calor, así que evitá sembrarla en verano.',
    consejos: [
      'Ideal para otoño e invierno',
      'Tolera heladas suaves',
      'Cosechá las hojas externas primero',
      'Si hace calor, buscá variedades resistentes al espigado'
    ],
    companeros: ['Lechuga', 'Rabanito', 'Frutilla'],
    dificultad: 'Fácil'
  },
  {
    id: 'zapallo',
    nombre: 'Zapallo',
    emoji: '🎃',
    siembra: 'Sep - Nov',
    riego: 'Cada 3 días',
    espacio: '100 cm',
    descripcion: 'Planta rastrera que necesita mucho espacio. Ideal si tenés un patio grande o podés hacer que trepe por una estructura.',
    consejos: [
      'Necesita MUCHO espacio horizontal o vertical',
      'Podés hacerlo trepar por un enrejado resistente',
      'Poné una tabla bajo los frutos para evitar que se pudran',
      'Cosechá cuando el tallo se seque y la cáscara esté dura'
    ],
    companeros: ['Maíz', 'Poroto', 'Albahaca'],
    dificultad: 'Medio'
  },
  {
    id: 'pepino',
    nombre: 'Pepino',
    emoji: '🥒',
    siembra: 'Oct - Dic',
    riego: 'Diario',
    espacio: '40 cm',
    descripcion: 'Planta trepadora que produce abundantemente en verano. Necesita tutor y riego constante para frutos no amargos.',
    consejos: [
      'Usá tutores para que trepe y ahorre espacio',
      'Regá frecuentemente, la falta de agua lo hace amargo',
      'Cosechá jóvenes para mejor sabor',
      'Es muy sensible al frío, esperá que pase el riesgo de heladas'
    ],
    companeros: ['Albahaca', 'Lechuga', 'Rabanito'],
    dificultad: 'Medio'
  },
  {
    id: 'perejil',
    nombre: 'Perejil',
    emoji: '🌱',
    siembra: 'Todo el año',
    riego: 'Cada 2 días',
    espacio: '15 cm',
    descripcion: 'Aromática versátil que se puede sembrar todo el año. Tarda en germinar (hasta 3 semanas) pero una vez establecido dura mucho.',
    consejos: [
      'Remojá las semillas 24h antes de sembrar',
      'La germinación es lenta, ¡no te desesperes!',
      'Tolera media sombra',
      'Cosechá los tallos externos, dejando el centro crecer'
    ],
    companeros: ['Tomate', 'Zanahoria', 'Espárrago'],
    dificultad: 'Fácil'
  },
  {
    id: 'rabanito',
    nombre: 'Rabanito',
    emoji: '🔴',
    siembra: 'Mar - May / Ago - Oct',
    riego: 'Diario',
    espacio: '5 cm',
    descripcion: 'El cultivo más rápido: en 30 días tenés cosecha. Perfecto para principiantes y para mantener el entusiasmo de los más chicos.',
    consejos: [
      '¡Listo en solo 30 días!',
      'Ideal para empezar y ver resultados rápidos',
      'No dejes que se pase de tiempo o se pone picante',
      'Sembrá cada 2 semanas para cosecha continua'
    ],
    companeros: ['Lechuga', 'Espinaca', 'Zanahoria'],
    dificultad: 'Fácil'
  },
  {
    id: 'acelga',
    nombre: 'Acelga',
    emoji: '🥬',
    siembra: 'Mar - May / Ago - Oct',
    riego: 'Cada 2 días',
    espacio: '30 cm',
    descripcion: 'Verdura de hoja resistente que produce durante meses. Las pencas de colores (amarillas, rojas) también son muy decorativas.',
    consejos: [
      'Una de las verduras más fáciles y productivas',
      'Cosechá las hojas externas, el centro sigue produciendo',
      'Tolera calor y frío moderado',
      'Las variedades de colores alegran la huerta'
    ],
    companeros: ['Lechuga', 'Zanahoria', 'Cebolla'],
    dificultad: 'Fácil'
  }
]

export function getCultivoById(id: string): Cultivo | undefined {
  return cultivos.find(c => c.id === id)
}
