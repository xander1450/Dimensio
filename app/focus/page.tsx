'use client'

import { useEffect, useState } from "react"
import "./focus.css"

export default function FocusPage() {
  const [time, setTime] = useState(300)
  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale")

  /* Timer */
  useEffect(() => {
    if (!running) return
    if (time === 0) {
      setRunning(false)
      return
    }
    const t = setTimeout(() => setTime(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [running, time])

  /* Breathing phase switch */
useEffect(() => {
  if (!running) return

  const interval = setInterval(() => {
    setPhase(p => (p === "inhale" ? "exhale" : "inhale"))
  }, 4000)

  return () => clearInterval(interval)
}, [running])


  const format = (t: number) =>
    `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`

  return (
    <div className="focus-page">
      {/* Chakra background */}
      <div className="chakra-bg" />
        <div className="ecg-container">
  <svg className="ecg">
    <polyline
      points="0,30 30,30 40,10 50,50 60,30 100,30 120,30 130,15 140,45 150,30 220,30"
      fill="none"
      stroke="red"
      strokeWidth="2"
    />
  </svg>
</div>

      {/* Breathing frequency */}
      <div className="breath-container">
        <div className={`breath-bar ${phase}`} />
        <div className="breath-label">
          {phase.toUpperCase()}
        </div>
      </div>

      <div className="focus-content">
        <h1>FOCUS</h1>
        <div className="timer">{format(time)}</div>

        <div className="buttons">
          <button onClick={() => setRunning(!running)}>
            {running ? "Pause" : "Start"}
          </button>
          <button onClick={() => setTime(300)}>Reset</button>
        </div>

        <p className="prompt">
          One breath. One moment.
        </p>
      </div>
    </div>
  )
}
