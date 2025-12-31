'use client'

import { useEffect, useState } from "react"
import { SplineScene } from "./ui/splite"

export function SplineSceneBasic() {
  const [rotate, setRotate] = useState(true)
  const [theme, setTheme] = useState<'neon' | 'dark'>('neon')

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const [bats, setBats] = useState<any[]>([])


useEffect(() => {
  const interval = setInterval(() => {
    setBats(b => [
      ...b,
      {
        id: Math.random(),
        left: Math.random() * 100,
        duration: 8 + Math.random() * 6
      }
    ])
  }, 1000)

  return () => clearInterval(interval)
}, [])

const [mouseX, setMouseX] = useState(0)

useEffect(() => {
  const move = (e: MouseEvent) => setMouseX(e.clientX)
  window.addEventListener("mousemove", move)
  return () => window.removeEventListener("mousemove", move)
}, [])



function explode(x: number, color: string) {
  for (let i = 0; i < 20; i++) {
    const piece = document.createElement('div')
    piece.className = 'confetti'
    piece.style.left = `${x}%`
    piece.style.top = '50%'
    piece.style.setProperty('--color', color)
    piece.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`)
    piece.style.setProperty('--y', `${(Math.random() - 0.5) * 200}px`)

    document.body.appendChild(piece)

    setTimeout(() => piece.remove(), 700)
  }
}

  return (
    <div className="hero">
      {bats.map(b => {
  const dodge =
    Math.abs(b.left * window.innerWidth / 100 - mouseX) < 120
      ? (b.left < 50 ? -40 : 40)
      : 0

  return (
    <div
      key={b.id}
      className="bat"
      style={{
        left: `calc(${b.left}% + ${dodge}px)`,
        animationDuration: `${b.duration}s`
      }}
    />
  )
})}

      <div className="left">
        <h1 className={`title ${theme === 'neon' ? 'neon-glow' : ''}`}>Welcome to Xander's Hub</h1>
        <p className="subtitle">
          An immersive 3D experience begins here.
        </p>

        <div className="controls">
          <button
            className="primary"
            onClick={() => setRotate(!rotate)}
          >
            {rotate ? "Pause Motion" : "Resume Motion"}
          </button>

<button
  className="secondary"
  onClick={() => window.location.href = "/game"}
>
  GAME
</button>
        </div>
      </div>

      <div className={`right ${rotate ? "spin" : ""}`}>
        <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
      </div>
    </div>
  )
}
