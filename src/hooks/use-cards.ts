import { useState } from 'react'
import { EMOJIS } from '@/const'
import { createCardObjects, pickAndShuffleEmojis, shuffleArray, sleep } from '@/helpers'

export function useCards() {
  const [cards, setCards] = useState(() => {
    const emojis = pickAndShuffleEmojis(EMOJIS, 6)
    return createCardObjects(emojis)
  })
  const [flippedCards, setFlippedCards] = useState<string[]>([])

  const checkForMatch = (id: string) => {
    if (!flippedCards.length) {
      setFlippedCards([id])
      return
    }

    const [firstCardId] = flippedCards
    const firstCard = cards.find((card) => card.id === firstCardId)
    const secondCard = cards.find((card) => card.id === id)
    if (!(firstCard && secondCard && firstCard.emoji === secondCard.emoji)) {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) => (card.id === firstCardId || card.id === id ? { ...card, isFlipped: false } : card)),
        )
        setFlippedCards([])
      }, 1000)
      return
    }

    setCards((prevCards) =>
      prevCards.map((card) => (card.id === firstCardId || card.id === id ? { ...card, isMatched: true } : card)),
    )
    setFlippedCards([])
  }

  const flipCard = (id: string) => {
    setCards((prevCards) => prevCards.map((card) => (card.id === id ? { ...card, isFlipped: !card.isFlipped } : card)))
    checkForMatch(id)
  }

  const restartGame = async () => {
    const newCards = cards.map((card) => ({ ...card, isFlipped: false, isMatched: false }))
    setCards(newCards)
    setFlippedCards([])
    const shuffledCards = shuffleArray([...newCards])
    await sleep(1000)
    setCards(shuffledCards)
  }

  return { cards, flipCard, restartGame }
}
