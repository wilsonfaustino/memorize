# 🧠 Memorize – A Memory Game Built with Modern Web Tech

[![Tests](https://github.com/wilsonfaustino/memorize/actions/workflows/test.yml/badge.svg)](https://github.com/wilsonfaustino/memorize/actions/workflows/test.yml) [![codecov](https://codecov.io/gh/wilsonfaustino/memorize/graph/badge.svg?token=VDRNLYC5GK)](https://codecov.io/gh/wilsonfaustino/memorize)

Memorize is a fast and beautiful memory card game built using cutting-edge front-end tools — designed to be lightweight, accessible, and fun.

> Challenge yourself, beat the timer, and try not to rage-click.

---

## 🎮 Demo

[Visit demo](https://memorize-7lgb.vercel.app/)

---

## 🚀 Tech Stack

| Tool                                                     | Purpose                                |
| -------------------------------------------------------- | -------------------------------------- |
| [React 19](https://react.dev)                            | UI framework                           |
| [TypeScript](https://www.typescriptlang.org)             | Static typing                          |
| [Vite 6](https://vitejs.dev)                             | Lightning-fast bundler                 |
| [Tailwind CSS v4](https://tailwindcss.com)               | Styling with utility classes           |
| [Motion](https://motion.dev/)                            | Animations                             |
| [Radix UI](https://www.radix-ui.com/)                    | Accessible primitives (modals, radios) |
| [Lucide Icons](https://lucide.dev)                       | SVG-based modern icon set              |
| [Biome](https://biomejs.dev)                             | Linting & formatting in one tool       |
| [Vitest](https://vitest.dev)                             | Blazing fast unit testing framework    |
| [Lefthook](https://evilmartians.com/chronicles/lefthook) | Git hooks for pre-commit automation    |

---

## 📆 Features

* 🃏 Select your difficulty: Easy, Medium, or Hard
* 🔁 Emoji-based cards with random shuffling
* ⏱️ Timer and move counter
* ✅ Matched pairs tracking
* 🎉 End-game modal with stats
* 🧼 Clean code, accessible components, and atomic hooks
* 🔧 Fully tested with unit tests and hooks coverage using Vitest

---

## 🧪 Commands

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint and format code
pnpm lint
pnpm format

# Run unit tests
pnpm test
```

> Pre-commit checks (via Lefthook) run Biome automatically on staged JS/TS/TSX files.

---

## 🧪 Tests

This project uses [Vitest](https://vitest.dev) for unit testing.

Test files are colocated inside:

```
src/
└── __tests__/
    ├── components/
    ├── hooks/
    └── helpers/
```

To run tests locally:

```bash
pnpm test
```

---

## 📁 Project Structure

```
src/
├── __tests__/        # Unit and component tests using Vitest
├── @types/           # Global types (MemoryCard, Difficulty)
├── components/       # UI pieces (Card, GameBoard, Modal, etc.)
├── hooks/            # Game logic (useCards, useTimer, etc.)
├── const/            # Emojis, difficulties, animations
├── helpers/          # Utility functions (shuffle, id, etc.)
├── index.css         # Global styles (Tailwind + CSS vars)
└── main.tsx          # App entry point
```

---

## Credits

Built with ❤️ and ☕.

---

## 📜 License

MIT
