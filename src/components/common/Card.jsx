export default function Card({ children, className = '', hover = true, ...props }) {
  const hoverClass = hover ? 'hover:scale-105 hover:shadow-xl hover:shadow-primary/20' : ''

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-lg border border-mutedGray/50 transition-all duration-300 ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
