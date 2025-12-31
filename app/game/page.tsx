'use client'

import { useEffect, useState } from "react"
import "./game.css"

export default function GamePage() {
  const [birds, setBirds] = useState<any[]>([])
  const [time, setTime] = useState(30)
  const [score, setScore] = useState(0)
  const [running, setRunning] = useState(true)

  
  //Sound
  const killAudio =
  typeof Audio !== "undefined"
    ? new Audio("/sounds/kill.mp3")
    : null

    
  // Timer
  useEffect(() => {
    if (!running) return
    const t = setInterval(() => {
      setTime(v => {
        if (v <= 1) {
          setRunning(false)
          return 0
        }
        return v - 1
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
          onClick={e =>
            killBird(
              b.id,
              e.clientX,
              e.clientY
            )
          }
        />
      ))}

      {!running && (
        <div className="game-over">
          <h1>Game Over</h1>
          <p>Final Score: {score}</p>
          <button onClick={() => window.location.href = "/"}>
            Back Home
          </button>
        </div>
      )}
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
