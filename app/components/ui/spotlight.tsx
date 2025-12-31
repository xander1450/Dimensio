export function Spotlight({
  className = '',
  fill = 'white',
}: {
  className?: string
  fill?: string
}) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
      style={{
        width: 400,
        height: 400,
        background: fill,
      }}
    />
  )
}
