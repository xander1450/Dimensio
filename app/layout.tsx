'use client'

import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import "./globals.css"

export default function RootLayout({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [started, setStarted] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    audioRef.current = new Audio("/sounds/bg.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.25
  }, [])

  // Start audio on first user interaction
  useEffect(() => {
    const startAudio = () => {
      if (!audioRef.current || started) return
      audioRef.current.muted = false
      audioRef.current.play()
      setStarted(true)
    }

    window.addEventListener("pointerdown", startAudio)
    window.addEventListener("keydown", startAudio)

    return () => {
      window.removeEventListener("pointerdown", startAudio)
      window.removeEventListener("keydown", startAudio)
    }
  }, [started])

  // Mute toggle
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted
    }
  }, [muted])

  return (
    <html lang="en">
      <body>
        {/* MUTE BUTTON */}
        <button
          onClick={() => setMuted(m => !m)}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 999,
            padding: "8px 14px",
            borderRadius: 20,
            background: "rgba(255,255,255,0.15)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
            cursor: "pointer"
          }}
        >
          {muted ? "🔇 Muted" : "🔊 Sound"}
        </button>

        {children}
      </body>
    </html>
  )
}
