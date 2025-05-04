import { render, screen } from '@testing-library/react'
import type { HTMLMotionProps } from 'motion/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { GameBoard } from '@/components/game-board'

// Mock motion's react module
vi.mock('motion/react', () => ({
  motion: {
    div: ({ className, children, ...rest }: HTMLMotionProps<'div'>) => (
      <div
        className={className}
        data-motion-props={JSON.stringify(rest)}>
        {children as React.ReactNode}
      </div>
    ),
  },
}))

describe('GameBoard', () => {
  it('renders children correctly', () => {
    render(
      <GameBoard difficulty="easy">
        <div>Child Element</div>
      </GameBoard>,
    )

    expect(screen.getByText('Child Element')).toBeInTheDocument()
  })

  it('applies the correct class for easy difficulty', () => {
    const { container } = render(
      <GameBoard difficulty="easy">
        <div>Content</div>
      </GameBoard>,
    )

    const boardElement = container.firstChild
    expect(boardElement).toHaveClass('grid grid-cols-4 gap-2 rounded-xl bg-blue-100 p-2')
    expect(boardElement).not.toHaveClass('sm:grid-cols-5')
  })

  it('applies the correct class for medium difficulty', () => {
    const { container } = render(
      <GameBoard difficulty="medium">
        <div>Content</div>
      </GameBoard>,
    )

    const boardElement = container.firstChild
    expect(boardElement).toHaveClass('grid grid-cols-4 gap-2 rounded-xl bg-blue-100 p-2')
    expect(boardElement).toHaveClass('sm:grid-cols-5')
  })

  it('applies the correct class for hard difficulty', () => {
    const { container } = render(
      <GameBoard difficulty="hard">
        <div>Content</div>
      </GameBoard>,
    )

    const boardElement = container.firstChild
    expect(boardElement).toHaveClass('grid grid-cols-4 gap-2 rounded-xl bg-blue-100 p-2')
    expect(boardElement).toHaveClass('sm:grid-cols-5 md:grid-cols-6')
  })

  it('includes animation props', () => {
    const { container } = render(
      <GameBoard difficulty="easy">
        <div>Content</div>
      </GameBoard>,
    )

    const boardElement = container.firstChild as HTMLElement
    const motionProps = JSON.parse(boardElement.getAttribute('data-motion-props') || '{}')
    expect(motionProps).toBeTruthy()
  })

  it('renders nothing if no children are provided', () => {
    const { container } = render(<GameBoard difficulty="easy"></GameBoard>)
    expect(container.firstChild?.childNodes.length).toBe(0)
  })
})
