'use client'

import { getLeaderboard, saveScore } from "./leaderboard"
import { useEffect, useState } from "react"
import "./game.css"

export default function GamePage() {
  const [birds, setBirds] = useState<any[]>([])
  const [time, setTime] = useState(30)
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(true)

  const [gameOver, setGameOver] = useState(false)
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [playerName, setPlayerName] = useState("")
  const [submitting, setSubmitting] = useState(false)


  
  //Sound
  const killAudio =
  typeof Audio !== "undefined"
    ? new Audio("/sounds/kill.mp3")
    : null

    
  // Timer
  useEffect(() => {
  if (!running) return

  const t = setInterval(() => {
    setTime(prev => {
      if (prev <= 1) {
        clearInterval(t)
        setRunning(false)
        setGameOver(true)

        // 👇 FETCH GLOBAL LEADERBOARD
        getLeaderboard().then(setLeaderboard)

        return 0
      }
      return prev - 1
    })
  }, 1000)

  return () => clearInterval(t)
}, [running])


  // Spawn birds
 useEffect(() => {
  if (!running) return

  const spawn = setInterval(() => {
    setBirds(b => [
      ...b,
      {
        id: Math.random(),
        left: Math.random() * 90,
        speed: 6 + Math.random() * 6
      }
    ])
  }, 700)

  return () => clearInterval(spawn)
}, [running])


  const killBird = (id: number, x: number, y: number) => {
  navigator.vibrate?.(20)
  new Audio("/sounds/kill.mp3").play()

  feathers(x, y)
  setBirds(b => b.filter(b => b.id !== id))
  setScore(s => s + 5)
}

return (
  <div className="game">
    {gameOver && (
      <div className="game-over">
        <h1>Game Over</h1>
        <p>Your Score: {score}</p>

        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          autoFocus
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
            width: "220px",
            fontSize: "16px",
            marginTop: "10px"
          }}
        />

        <button
          disabled={!playerName.trim() || submitting}
          onClick={async () => {
            setSubmitting(true)
            await saveScore({ name: playerName.trim(), score })
            const updated = await getLeaderboard()
            setLeaderboard(updated)
            setSubmitting(false)
          }}
        >
          {submitting ? "Submitting..." : "Submit Score"}
        </button>

        <Leaderboard list={leaderboard} />

        <button onClick={() => window.location.reload()}>
          Play Again
        </button>

        <button onClick={() => (window.location.href = "/")}>
          Back Home
        </button>
      </div>
    )}

    <div className="hud">
      <div>⏱ {time}s</div>
      <div>💀 Score: {score}</div>
    </div>

    {birds.map(b => (
      <div
        key={b.id}
        className="bird"
        style={{
          left: `${b.left}%`,
          animationDuration: `${b.speed}s`
        }}
        onClick={e => killBird(b.id, e.clientX, e.clientY)}
      />
    ))}
  </div>
)

 
}

// Feather splatter
function feathers(x: number, y: number) {
  for (let i = 0; i < 18; i++) {
    const f = document.createElement("div")
    f.innerText = "🪶"
    f.style.position = "fixed"
    f.style.left = `${x}px`
    f.style.top = `${y}px`
    f.style.fontSize = "16px"
    f.style.pointerEvents = "none"
    f.style.transform = "translate(0,0)"
    f.style.animation = "feather 700ms ease-out forwards"
    f.style.setProperty("--x", `${(Math.random() - 0.5) * 200}px`)
    f.style.setProperty("--y", `${(Math.random() - 0.5) * 200}px`)
    document.body.appendChild(f)
    setTimeout(() => f.remove(), 700)
  }
}

function Leaderboard({ list }: { list: any[] }) {
  if (!list.length) return null

  const trophy = (rank: number) => {
    if (rank === 0) return "🥇"
    if (rank === 1) return "🥈"
    if (rank === 2) return "🥉"
    return `#${rank + 1}`
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h2>🏆 Global Top 10</h2>

      <ol className="leaderboard">
        {list.map((e, i) => (
          <li
            key={e.name}
            style={{
              animationDelay: `${i * 80}ms`,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: i < 3 ? "bold" : "normal",
              color:
                i === 0
                  ? "#FFD700"
                  : i === 1
                  ? "#C0C0C0"
                  : i === 2
                  ? "#CD7F32"
                  : "white",
            }}
          >
            <span style={{ fontSize: "20px" }}>{trophy(i)}</span>
            <span>{e.name}</span>
            <span style={{ marginLeft: "auto" }}>{e.score}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
