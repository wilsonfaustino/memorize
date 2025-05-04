import * as AlertDialog from '@radix-ui/react-alert-dialog'

interface EndGameModalProps {
  moves: number
  time: string
  onRestart: () => void
  isOpen: boolean
}

export function EndGameModal({ isOpen, moves, time, onRestart }: EndGameModalProps) {
  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" />
        <AlertDialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 max-w-sm rounded-xl bg-white p-6 text-center shadow-lg focus:outline-none data-[state=closed]:animate-contentHide data-[state=open]:animate-contentShow md:max-w-md lg:max-w-lg">
          <AlertDialog.Title className="mb-4 font-bold text-2xl">🎉 Congratulations! 🎉</AlertDialog.Title>
          <AlertDialog.Description className="mb-6 text-lg">
            You completed the game in <br />
            <b>{moves} moves</b> and <b>{time}</b>!
          </AlertDialog.Description>
          <AlertDialog.Action asChild>
            <button
              aria-label="Play Again"
              className="rounded-lg bg-pink px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
              onClick={onRestart}
              type="button">
              Play Again
            </button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
