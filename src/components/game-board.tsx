import type { ReactNode } from 'react'

interface GameBoardProps {
  children: ReactNode
}

export function GameBoard({ children }: GameBoardProps) {
  return <div className="grid grid-cols-4 gap-2 rounded-xl bg-blue-100 p-2">{children}</div>
}
