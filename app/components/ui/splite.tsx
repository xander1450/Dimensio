'use client'

import Spline from '@splinetool/react-spline'

export function SplineScene({
  scene,
  className = '',
}: {
  scene: string
  className?: string
}) {
  return (
    <div className={className}>
      <Spline scene={scene} />
    </div>
  )
}
