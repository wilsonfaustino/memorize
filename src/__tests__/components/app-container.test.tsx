import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppContainer } from '@/components/app-container'

describe('AppContainer', () => {
  it('renders children correctly', () => {
    render(
      <AppContainer>
        <div data-testid="test-child">Test Content</div>
      </AppContainer>,
    )

    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('applies the correct CSS classes', () => {
    render(
      <AppContainer>
        <div>Child content</div>
      </AppContainer>,
    )

    const container = screen.getByText('Child content').parentElement
    expect(container).toHaveClass(
      'flex',
      'min-h-screen',
      'flex-col',
      'items-center',
      'justify-center',
      'gap-2',
      'bg-blue-200',
      'px-4',
    )
  })

  it('renders multiple children', () => {
    render(
      <AppContainer>
        <div data-testid="child-1">First Child</div>
        <div data-testid="child-2">Second Child</div>
      </AppContainer>,
    )

    expect(screen.getByTestId('child-1')).toBeInTheDocument()
    expect(screen.getByTestId('child-2')).toBeInTheDocument()
    expect(screen.getByText('First Child')).toBeInTheDocument()
    expect(screen.getByText('Second Child')).toBeInTheDocument()
  })
})
