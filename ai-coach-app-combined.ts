// ==================== package.json ====================
/*
{
  "name": "ai-coach-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-select": "^1.2.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@types/node": "20.3.1",
    "@types/react": "18.2.12",
    "@types/react-dom": "18.2.5",
    "autoprefixer": "10.4.14",
    "class-variance-authority": "^0.6.0",
    "clsx": "^1.2.1",
    "eslint": "8.42.0",
    "eslint-config-next": "13.4.5",
    "lucide-react": "^0.244.0",
    "moment": "^2.29.4",
    "next": "13.4.5",
    "postcss": "8.4.24",
    "react": "18.2.0",
    "react-big-calendar": "^1.8.1",
    "react-dom": "18.2.0",
    "recharts": "^2.7.1",
    "tailwind-merge": "^1.13.2",
    "tailwindcss": "3.3.2",
    "tailwindcss-animate": "^1.0.6",
    "typescript": "5.1.3"
  }
}
*/

// ==================== tsconfig.json ====================
/*
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/ *.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
*/

// ==================== tailwind.config.js ====================
/*
/** @type {import('tailwindcss').Config} */
module.exports =
  {
    darkMode: ["class"],
    content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  } * /

// ==================== app/layout.tsx ====================
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AI Coach App",
  description: "Manage your coaching schedule, finances, and performance",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <nav className="w-64 bg-white shadow-md">{/* Add navigation items here */}</nav>
          <main className="flex-1 p-8 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
// ==================== app/page.tsx ====================
;("use client")

import { useState } from "react"
import WeeklySchedule from "./components/WeeklySchedule"
import PlayerManagement from "./components/PlayerManagement"
import FinancialTracking from "./components/FinancialTracking"
import Analytics from "./components/Analytics"
import CompletionTracker from "./components/CompletionTracker"

export default function Home() {
  const [events, setEvents] = useState([])

  const handleEventsChange = (newEvents) => {
    setEvents(newEvents)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">AI Coach Dashboard</h1>
      <WeeklySchedule onEventsChange={handleEventsChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PlayerManagement />
        <FinancialTracking />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Analytics />
        <CompletionTracker events={events} />
      </div>
    </div>
  )
}
// ==================== app/components/WeeklySchedule.tsx ====================
;("use client")

import { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Button } from "@/components/ui/button"
import { sports } from "../utils/sports"

// Initialize localizer
const localizer = momentLocalizer(moment)

type Event = {
  id: number
  title: string
  start: Date
  end: Date
  player: string
  sport: string
  completed: boolean
}

// Sample data (replace with actual data from your backend)
const initialEvents: Event[] = [
  {
    id: 1,
    title: "Tennis with John",
    start: new Date(2023, 5, 1, 10, 0),
    end: new Date(2023, 5, 1, 11, 0),
    player: "John",
    sport: "tennis",
    completed: false,
  },
  {
    id: 2,
    title: "Basketball with Sarah",
    start: new Date(2023, 5, 2, 14, 0),
    end: new Date(2023, 5, 2, 15, 0),
    player: "Sarah",
    sport: "basketball",
    completed: false,
  },
]

export default function WeeklySchedule({ onEventsChange }: { onEventsChange: (events: Event[]) => void }) {
  const [myEvents, setMyEvents] = useState<Event[]>(initialEvents)

  const setMyEventsAndNotify = (newEvents: Event[]) => {
    setMyEvents(newEvents);
    onEventsChange(newEvents);
  };

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('New session name')
    if (title) {
      const sport = window.prompt(`Sport (${sports.join(', ')})`)
      if (sport && sports.map(s => s.toLowerCase()).includes(sport.toLowerCase())) {
        const player = window.prompt('Player name')
        setMyEventsAndNotify([
          ...myEvents,
          {
            id: Date.now(),
            title,
            start,
            end,
            player,
            sport: sport.toLowerCase(),
            completed: false,
          },
        ])
      } else {
        alert('Please enter a valid sport from the list.')
      }
    }
  }

  const handleSelectEvent = (event: Event) => {
    const isCompleted = window.confirm(`Mark "${event.title}" as completed?`)
    if (isCompleted) {
      setMyEventsAndNotify(myEvents.map(e => 
        e.id === event.id ? { ...e, completed: true } : e
      ))
    }
  }

  const eventStyleGetter = (event: Event) => {
    const sportIndex = sports.findIndex(s => s.toLowerCase() === event.sport.toLowerCase())
    const hue = (sportIndex * 137.5) % 360 // Use golden ratio to distribute colors
    const backgroundColor = `hsl(${hue}, 70%, 50%)`
    const style: React.CSSProperties = {
      backgroundColor,
      borderRadius: '5px',
      opacity: event.completed ? 0.6 : 1,
      color: 'white',
      border: 'none',
      display: 'block'
    }
    return { style }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Weekly Schedule</h2>
      <div className="h-[600px]">
        <Calendar
          localizer={localizer}
          events={myEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  )
}
// ==================== app/components/PlayerManagement.tsx ====================
;("use client")

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sports } from "../utils/sports"

type Player = {
  id: number
  name: string
  sport: string
  color: string
}

export default function PlayerManagement() {
  const [players, setPlayers] = useState<Player[]>([])
  const [newPlayer, setNewPlayer] = useState({ name: '', sport: '', color: '' })

  const addPlayer = () => {
    if (newPlayer.name && newPlayer.sport && newPlayer.color) {
      setPlayers([...players, { ...newPlayer, id: Date.now() }])
      setNewPlayer({ name: '', sport: '', color: '' })
    }
  }

  const deletePlayer = (id: number) => {
    setPlayers(players.filter(player => player.id !== id))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Player Management</h2>
      <div className="space-y-4 mb-4">
        <Input
          placeholder="Player Name"
          value={newPlayer.name}
          onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
        />
        <Select onValueChange={(value) => setNewPlayer({ ...newPlayer, sport: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Sport" />
          </SelectTrigger>
          <SelectContent>
            {sports.map((sport) => (
              <SelectItem key={sport} value={sport.toLowerCase()}>{sport}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="color"
          value={newPlayer.color}
          onChange={(e) => setNewPlayer({ ...newPlayer, color: e.target.value })}
        />
        <Button onClick={addPlayer}>Add Player</Button>
      </div>
      <ul className="space-y-2">
        {players.map(player => (
          <li key={player.id} className="flex justify-between items-center">
            <span>{player.name} - {player.sport}</span>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: player.color }}></div>
              <Button variant="destructive" onClick={() => deletePlayer(player.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
// ==================== app/components/FinancialTracking.tsx ====================
;("use client")

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Transaction = {
  id: number
  type: "income" | "expense"
  amount: number
  description: string
}

export default function FinancialTracking() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [newTransaction, setNewTransaction] = useState({ type: 'income', amount: '', description: '' })

  const addTransaction = () => {
    if (newTransaction.amount && newTransaction.description) {
      setTransactions([...transactions, { ...newTransaction, id: Date.now(), amount: Number.parseFloat(newTransaction.amount) }])
      setNewTransaction({ type: 'income', amount: '', description: '' })
    }
  }

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
  const netProfit = totalIncome - totalExpenses

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Financial Tracking</h2>
      <div className="space-y-4 mb-4">
        <select
          className="w-full p-2 border rounded"
          value={newTransaction.type}
          onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as 'income' | 'expense' })}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <Input
          type="number"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={newTransaction.description}
          onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
        />
        <Button onClick={addTransaction}>Add Transaction</Button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">${netProfit.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      <ul className="space-y-2">
        {transactions.map(transaction => (
          <li key={transaction.id} className="flex justify-between items-center">
            <span>{transaction.description}</span>
            <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
              ${transaction.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
// ==================== app/components/Analytics.tsx ====================
;("use client")

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Sample data (replace with actual data from your backend)
const data = [
  { name: "Mon", hours: 4 },
  { name: "Tue", hours: 6 },
  { name: "Wed", hours: 5 },
  { name: "Thu", hours: 7 },
  { name: "Fri", hours: 3 },
  { name: "Sat", hours: 8 },
  { name: "Sun", hours: 2 },
]

export default function Analytics() {
  const totalHours = data.reduce((sum, day) => sum + day.hours, 0)

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Total Hours Worked This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalHours} hours</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Hours Worked by Day</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="hours" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
// ==================== app/components/CompletionTracker.tsx ====================
;("use client")

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sports } from "../utils/sports"

type Completion = {
  sport: string
  count: number
}

type CompletionTrackerProps = {
  events: Array<{
    sport: string
    completed: boolean
  }>
}

export default function CompletionTracker({ events }: CompletionTrackerProps) {
  const [completions, setCompletions] = useState<Completion[]>([])

  useEffect(() => {
    const completedEvents = events.filter(event => event.completed)
    const sportCounts = completedEvents.reduce((acc, event) => {
      acc[event.sport] = (acc[event.sport] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const newCompletions = sports.map(sport => ({
      sport,
      count: sportCounts[sport.toLowerCase()] || 0
    })).filter(completion => completion.count > 0)

    setCompletions(newCompletions)
  }, [events])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Completed Sessions by Sport</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {completions.map(completion => (
            <li key={completion.sport} className="flex justify-between items-center">
              <span className="font-medium">{completion.sport}</span>
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
                {completion.count}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

// ==================== app/utils/sports.ts ====================
export const sports = [
  "Football",
  "Basketball",
  "Tennis",
  "Cricket",
  "Volleyball",
  "Table Tennis",
  "Baseball",
  "Golf",
  "Rugby",
  "Badminton",
  "Swimming",
  "Boxing",
  "Athletics",
  "Cycling",
  "Wrestling",
  "Martial Arts",
  "Hockey",
  "Gymnastics",
  "Skiing",
  "Snowboarding",
  "Surfing",
  "Rowing",
  "Handball",
  "Fencing",
]

// ==================== components/ui/button.tsx ====================
import type * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

// ==================== components/ui/input.tsx ====================
import type * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }

// ==================== components/ui/card.tsx ====================
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

// ==================== lib/utils.ts ====================
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

