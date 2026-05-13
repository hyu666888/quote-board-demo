import { useState } from 'react'
import { Copy, Check, Shuffle } from 'lucide-react'

type Category = 'Motivational' | 'Philosophy' | 'Humor'

interface Quote {
  id: number
  text: string
  author: string
  category: Category
}

const QUOTES: Quote[] = [
  {
    id: 1,
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    category: 'Motivational',
  },
  {
    id: 2,
    text: 'Be yourself; everyone else is already taken.',
    author: 'Oscar Wilde',
    category: 'Humor',
  },
  {
    id: 3,
    text: "Life is what happens when you're busy making other plans.",
    author: 'John Lennon',
    category: 'Philosophy',
  },
  {
    id: 4,
    text: 'In the middle of difficulty lies opportunity.',
    author: 'Albert Einstein',
    category: 'Motivational',
  },
  {
    id: 5,
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: 'Thomas A. Edison',
    category: 'Humor',
  },
  {
    id: 6,
    text: 'The unexamined life is not worth living.',
    author: 'Socrates',
    category: 'Philosophy',
  },
  {
    id: 7,
    text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    author: 'Albert Einstein',
    category: 'Humor',
  },
  {
    id: 8,
    text: 'It does not matter how slowly you go as long as you do not stop.',
    author: 'Confucius',
    category: 'Philosophy',
  },
]

const CATEGORY_STYLES: Record<Category, { badge: string; dot: string }> = {
  Motivational: {
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    dot: 'bg-amber-400',
  },
  Philosophy: {
    badge: 'bg-sky-100 text-sky-700 border-sky-200',
    dot: 'bg-sky-400',
  },
  Humor: {
    badge: 'bg-violet-100 text-violet-700 border-violet-200',
    dot: 'bg-violet-400',
  },
}

function fisherYates<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function QuoteCard({ quote }: { quote: Quote }) {
  const [copied, setCopied] = useState(false)
  const styles = CATEGORY_STYLES[quote.category]

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`"${quote.text}" — ${quote.author}`)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {/* clipboard unavailable */})
  }

  return (
    <div className="relative flex flex-col bg-[#fffdf8] rounded-2xl border border-[#e8dfd0] p-6 shadow-sm hover:shadow-md transition-shadow duration-200 group">
      {/* Decorative opening quote mark */}
      <span
        aria-hidden="true"
        className="absolute top-3 left-5 font-serif text-6xl leading-none text-[#d4c4ae] select-none pointer-events-none"
      >
        "
      </span>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        title="Copy quote"
        aria-label="Copy quote to clipboard"
        className="absolute top-4 right-4 p-1.5 rounded-lg text-[#9aacbb] hover:text-[#4a6fa5] hover:bg-[#e6eef7] active:scale-90 transition-all duration-150"
      >
        {copied ? (
          <Check size={15} className="text-emerald-500" />
        ) : (
          <Copy size={15} />
        )}
      </button>

      {/* Quote text */}
      <p className="font-serif italic text-[#2c3a4a] text-[1.05rem] leading-relaxed mt-7 mb-4">
        {quote.text}
      </p>

      {/* Footer: author + badge */}
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#ede5d8]">
        <span className="text-sm font-medium text-[#5a6a7a] truncate mr-2">
          — {quote.author}
        </span>
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${styles.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
          {quote.category}
        </span>
      </div>
    </div>
  )
}

export default function App() {
  const [quotes, setQuotes] = useState<Quote[]>(QUOTES)
  const [spinning, setSpinning] = useState(false)

  const handleShuffle = () => {
    setSpinning(true)
    setTimeout(() => setSpinning(false), 400)
    setQuotes(fisherYates(quotes))
  }

  return (
    <div className="min-h-screen bg-[#fdf6ec] px-4 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-[#2c3a4a] tracking-tight mb-2">
            Quote Board
          </h1>
          <p className="text-[#8a9aaa] text-[0.95rem]">
            Eight voices. One shuffle button.
          </p>
        </header>

        {/* Shuffle button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-2 bg-[#4a6fa5] hover:bg-[#3d5f92] active:scale-95 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-150"
          >
            <Shuffle
              size={16}
              className={spinning ? 'animate-spin' : 'transition-transform'}
            />
            Shuffle
          </button>
        </div>

        {/* Quote grid */}
        <main className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </main>

        <footer className="mt-14 text-center text-xs text-[#b0bec8]">
          Tap the <Copy size={11} className="inline mb-0.5" /> icon on any card to copy the quote.
        </footer>
      </div>
    </div>
  )
}
