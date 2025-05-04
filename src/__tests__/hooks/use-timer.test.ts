import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTimer } from '@/hooks/use-timer'

describe('useTimer hook', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useTimer())

    expect(result.current.time).toBe(0)
    expect(result.current.isRunning).toBe(false)
  })

  it('should start the timer when startTimer is called', () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.startTimer()
    })

    expect(result.current.isRunning).toBe(true)
  })

  it('should stop the timer when stopTimer is called', () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.startTimer()
      result.current.stopTimer()
    })

    expect(result.current.isRunning).toBe(false)
  })

  it('should reset the timer when resetTimer is called', () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.startTimer()
      vi.advanceTimersByTime(5000)
      result.current.resetTimer()
    })

    expect(result.current.time).toBe(0)
    expect(result.current.isRunning).toBe(false)
  })

  it('should increment time every second when timer is running', () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.startTimer()
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.time).toBe(1)

    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(result.current.time).toBe(4)
  })

  it('should not increment time when timer is stopped', async () => {
    const { result } = renderHook(() => useTimer())

    act(() => {
      result.current.startTimer()
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })
    expect(result.current.time).toBe(2)

    act(() => {
      result.current.stopTimer()
    })

    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(result.current.time).toBe(2)
  })

  it('should clean up interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    const { result, unmount } = renderHook(() => useTimer())

    act(() => {
      result.current.startTimer()
    })

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
  })
})
