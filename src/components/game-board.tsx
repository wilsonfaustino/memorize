import { EMOJIS } from '@/const'
import { createCardObjects, pickAndShuffleEmojis } from '@/helpers'
import { Card } from './card'

const CARDS = createCardObjects(pickAndShuffleEmojis(EMOJIS, 6))

export function GameBoard() {
  return (
    <div className="grid grid-cols-4 gap-2 rounded-xl bg-blue-100 p-2">
      {CARDS.map((card) => (
        <Card
          key={card.id}
          {...card}
        />
      ))}
    </div>
  )
}
