import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useDisclosure } from '@/hooks/use-disclosure'

describe('useDisclosure', () => {
  it('should initialize with isOpen set to false', () => {
    const { result } = renderHook(() => useDisclosure())
    expect(result.current.isOpen).toBe(false)
  })

  it('should set isOpen to true when onOpen is called', () => {
    const { result } = renderHook(() => useDisclosure())
    act(() => {
      result.current.onOpen()
    })
    expect(result.current.isOpen).toBe(true)
  })

  it('should set isOpen to false when onClose is called', () => {
    const { result } = renderHook(() => useDisclosure())

    // First, set it to true
    act(() => {
      result.current.onOpen()
    })
    expect(result.current.isOpen).toBe(true)

    // Then close it
    act(() => {
      result.current.onClose()
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('should toggle isOpen when onToggle is called', () => {
    const { result } = renderHook(() => useDisclosure())

    // Initially false
    expect(result.current.isOpen).toBe(false)

    // Toggle to true
    act(() => {
      result.current.onToggle()
    })
    expect(result.current.isOpen).toBe(true)

    // Toggle to false
    act(() => {
      result.current.onToggle()
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('should maintain function references between renders', () => {
    const { result, rerender } = renderHook(() => useDisclosure())

    const { onOpen, onClose, onToggle } = result.current

    rerender()

    expect(result.current.onOpen).toBe(onOpen)
    expect(result.current.onClose).toBe(onClose)
    expect(result.current.onToggle).toBe(onToggle)
  })

  it('should not change isOpen when calling onOpen repeatedly', () => {
    const { result } = renderHook(() => useDisclosure())
    act(() => {
      result.current.onOpen()
      result.current.onOpen()
      result.current.onOpen()
    })
    expect(result.current.isOpen).toBe(true)
  })

  it('should correctly handle chaotic sequence of calls', () => {
    const { result } = renderHook(() => useDisclosure())

    act(() => {
      result.current.onOpen()
      result.current.onToggle()
      result.current.onClose()
      result.current.onToggle()
    })

    expect(result.current.isOpen).toBe(true)
  })
})
