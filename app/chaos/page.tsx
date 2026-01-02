'use client'

import { useEffect, useState } from "react"
import "./chaos.css"

/* ALL CHAOS MODES (nothing removed) */
const CHAOS_MODES = [
  "melt",
  "wind",
  "blackhole",
  "lightning",
  "hallucination",
  "shake",
  "break",
  "wordstorm",
]

/* BACKGROUND IMAGES (RESTORED) */
const BG_IMAGES = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
]

export default function ChaosPage() {
  const [modes, setModes] = useState<string[]>([])
  const [bg, setBg] = useState<string>("")
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  /* 🧲 Cursor gravity */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 35,
        y: (e.clientY / window.innerHeight - 0.5) * 35,
      })
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  /* 🔥 Trigger Chaos (2 modes at once, persistent) */
  const triggerChaos = () => {
    const shuffled = [...CHAOS_MODES].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 2)

    setModes(selected)
    setBg(BG_IMAGES[Math.floor(Math.random() * BG_IMAGES.length)])
  }

  return (
    <div
      className={`chaos-page ${modes.map(m => `chaos-${m}`).join(" ")}`}
      style={{
        backgroundImage: bg ? `url(${bg})` : "none",
        transform: `translate(${mouse.x}px, ${mouse.y}px)`,
      }}
    >
      <button className="chaos-btn" onClick={triggerChaos}>
        CHAOS
      </button>

      {/* CONDITIONAL CHAOS LAYERS */}
      {modes.includes("hallucination") && <Hallucination />}
      {modes.includes("lightning") && <Lightning />}
      {modes.includes("break") && <BreakScreen />}
      {modes.includes("wordstorm") && <WordStorm />}

    </div>
  )
}

/* 🧠 TEXT HALLUCINATIONS */
function Hallucination() {
  const words = ["WHY", "WHO", "RUN", "ERROR", "DIMENSIO", "WAKE UP"]
  return (
    <div className="hallucination">
      {Array.from({ length: 30 }).map((_, i) => (
        <span key={i}>
          {words[Math.floor(Math.random() * words.length)]}
        </span>
      ))}
    </div>
  )
}

/* 🌪️ WORD STORM (FLYING CHAOS WORDS) */
function WordStorm() {
  const words = [
    "CHAOS",
    "SYSTEM",
    "BROKEN",
    "WHY",
    "ERROR",
    "NO ESCAPE",
    "DIMENSIO",
  ]

  return (
    <div className="wordstorm">
      {Array.from({ length: 40 }).map((_, i) => (
        <span key={i}>
          {words[Math.floor(Math.random() * words.length)]}
        </span>
      ))}
    </div>
  )
}

/* ⚡ LIGHTNING FLASH */
function Lightning() {
  return <div className="lightning" />
}

/* 💥 SCREEN BREAK */
function BreakScreen() {
  return (
    <div className="break">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="shard" />
      ))}
    </div>
  )
}
