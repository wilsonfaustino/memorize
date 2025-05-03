import type { ReactNode } from 'react'

export function AppContainer({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-blue-200">{children}</div>
}
