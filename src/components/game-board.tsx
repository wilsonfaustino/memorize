import { MemoryCard } from '@/@types'
import { Card } from './card'

interface GameBoardProps {
  cards: MemoryCard[]
  onCardClick: (id: string) => void
}

export function GameBoard({ cards, onCardClick }: GameBoardProps) {
  return (
    <div className="grid grid-cols-4 gap-2 rounded-xl bg-blue-100 p-2">
      {cards.map((card) => (
        <Card
          key={card.id}
          {...card}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  )
}
