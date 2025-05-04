import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { DifficultySelector } from '@/components/difficulty-selector'
import { EASY, HARD, MEDIUM } from '@/const'

describe('DifficultySelector', () => {
  it('renders all difficulty options correctly', () => {
    render(<DifficultySelector onChange={() => {}} />)

    const easyButton = screen.getByText('Easy').closest('button')

    // Check for heading
    expect(screen.getByText('Select Difficulty')).toBeInTheDocument()

    // Check for all difficulty options
    expect(screen.getByText('Easy')).toBeInTheDocument()
    expect(screen.getByText('Medium')).toBeInTheDocument()
    expect(screen.getByText('Hard')).toBeInTheDocument()
    // check a11y
    expect(easyButton).toHaveAttribute('role', 'radio')
    expect(easyButton).toBeEnabled()
  })

  it('calls onChange with the correct value when a difficulty is selected', async () => {
    const user = userEvent.setup()
    const onChangeMock = vi.fn()

    render(<DifficultySelector onChange={onChangeMock} />)

    // Click each difficulty option and verify the callback
    await user.click(screen.getByText('Easy'))
    expect(onChangeMock).toHaveBeenCalledWith(EASY)

    await user.click(screen.getByText('Medium'))
    expect(onChangeMock).toHaveBeenCalledWith(MEDIUM)

    await user.click(screen.getByText('Hard'))
    expect(onChangeMock).toHaveBeenCalledWith(HARD)

    // Verify total number of calls
    expect(onChangeMock).toHaveBeenCalledTimes(3)
  })

  it('has the correct styling for each difficulty option', () => {
    render(<DifficultySelector onChange={() => {}} />)

    const easyButton = screen.getByText('Easy').closest('button')
    const mediumButton = screen.getByText('Medium').closest('button')
    const hardButton = screen.getByText('Hard').closest('button')

    expect(easyButton).toHaveClass('from-green-500 to-green-700')
    expect(mediumButton).toHaveClass('from-indigo-500 to-indigo-700')
    expect(hardButton).toHaveClass('from-purple-500 to-purple-700')
  })
})
