import { useCallback, useEffect, useRef, useState } from 'react'
import type { MemoryCard } from '@/@types'
import { setupEmojiArray, shuffleArray } from '@/helpers'
import { useCounter } from '@/hooks/use-counter'
import { useDisclosure } from '@/hooks/use-disclosure'
import { useTimer } from '@/hooks/use-timer'

interface UseCardsProps {
  difficulty: 'easy' | 'medium' | 'hard' | null
}

export function useCards({ difficulty }: UseCardsProps) {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<string[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { counter, incrementCounter, resetCounter } = useCounter({ initialValue: 0 })
  const { time, startTimer, resetTimer, stopTimer, isRunning } = useTimer()
  const endTriggered = useRef(false)
  const lockRef = useRef(false)

  const checkForMatch = useCallback(
    (firstId: string, secondId: string, currentCards: MemoryCard[]) => {
      const firstCard = currentCards.find((card) => card.id === firstId)
      const secondCard = currentCards.find((card) => card.id === secondId)
      if (!(firstCard && secondCard && firstCard.emoji === secondCard.emoji)) {
        incrementCounter()
        lockRef.current = true
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card,
            ),
          )
          setFlippedCards([])
          lockRef.current = false
        }, 1000)
        return
      }

      setCards((prevCards) => {
        const updated = prevCards.map((card) =>
          card.id === firstId || card.id === secondId ? { ...card, isMatched: true } : card,
        )

        const allMatched = updated.every((card) => card.isMatched)

        if (allMatched && !endTriggered.current) {
          endTriggered.current = true
          onOpen()
          stopTimer()
        }

        return updated
      })
      setFlippedCards([])
      incrementCounter()
    },
    [incrementCounter, onOpen, stopTimer],
  )

  const flipCard = useCallback(
    (id: string) => {
      if (lockRef.current) return
      if (!isRunning) {
        startTimer()
      }

      const updatedCards = cards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))

      if (!flippedCards.length) {
        setFlippedCards([id])
        setCards(updatedCards)
        return
      }

      const newFlippedCards = [...flippedCards, id]

      const [firstCardId] = flippedCards

      if (id === firstCardId || newFlippedCards.length > 2) return

      setFlippedCards(newFlippedCards)
      setCards(updatedCards)
      checkForMatch(firstCardId, id, updatedCards)
    },
    [cards, checkForMatch, isRunning, startTimer, flippedCards],
  )

  const performRestartSequence = useCallback(
    (newCards: MemoryCard[]) => {
      setCards(newCards)
      isOpen && onClose()
      resetCounter()
      resetTimer()
      endTriggered.current = false
    },
    [isOpen, onClose, resetCounter, resetTimer],
  )

  const restartGame = () => {
    const newCards = cards.map((card) => ({ ...card, isFlipped: false, isMatched: false }))
    setCards(newCards)
    setFlippedCards([])
    const shuffledCards = shuffleArray([...newCards])

    performRestartSequence(shuffledCards)
  }

  useEffect(() => {
    if (!difficulty) return
    const newCards = setupEmojiArray(difficulty)

    setCards(newCards)
  }, [difficulty])

  return { cards, flipCard, restartGame, isOpen, moves: counter, time }
}
