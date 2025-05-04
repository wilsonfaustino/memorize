import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Card } from '@/components/card'

describe('Card', () => {
  it('renders back face by default', () => {
    render(
      <Card
        emoji="🚀"
        isFlipped={false}
        isMatched={false}
        onClick={() => {}}
      />,
    )

    // The sparkles icon should be visible when card is not flipped
    expect(document.querySelector('.backface-hidden svg')).toBeInTheDocument()

    // The emoji should be in the DOM but not visible (due to card being face down)
    const cardElement = screen.getByText('🚀')
    expect(cardElement).toBeInTheDocument()
    expect(cardElement.closest('.transform-3d')).not.toHaveClass('rotate-y-180')
  })

  it('shows front face when flipped', () => {
    render(
      <Card
        emoji="🚀"
        isFlipped={true}
        isMatched={false}
        onClick={() => {}}
      />,
    )

    // The card container should have the rotation class
    const cardContainer = screen.getByText('🚀').closest('.transform-3d')
    expect(cardContainer).toHaveClass('rotate-y-180')
  })

  it('shows front face when matched', () => {
    render(
      <Card
        emoji="🚀"
        isFlipped={false}
        isMatched={true}
        onClick={() => {}}
      />,
    )

    // The card container should have the rotation class
    const cardContainer = screen.getByText('🚀').closest('.transform-3d')
    expect(cardContainer).toHaveClass('rotate-y-180')
  })

  it('calls the onClick handler when clicked', async () => {
    const user = userEvent.setup()
    const onClickMock = vi.fn()

    render(
      <Card
        emoji="🚀"
        isFlipped={false}
        isMatched={false}
        onClick={onClickMock}
      />,
    )

    const cardButton = screen.getByRole('button')
    await user.click(cardButton)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  it('displays the correct emoji', () => {
    render(
      <Card
        emoji="🎮"
        isFlipped={true}
        isMatched={false}
        onClick={() => {}}
      />,
    )
    expect(screen.getByText('🎮')).toBeInTheDocument()

    // Re-render with different emoji
    render(
      <Card
        emoji="🚀"
        isFlipped={true}
        isMatched={false}
        onClick={() => {}}
      />,
    )
    expect(screen.getByText('🚀')).toBeInTheDocument()
  })

  it('shows front face when flipped and matched', () => {
    render(
      <Card
        emoji="🚀"
        isFlipped={true}
        isMatched={true}
        onClick={() => {}}
      />,
    )

    const cardContainer = screen.getByText('🚀').closest('.transform-3d')
    expect(cardContainer).toHaveClass('rotate-y-180')
  })
})
