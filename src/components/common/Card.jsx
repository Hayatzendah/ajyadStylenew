export default function Card({ children, className = '', hover = true, ...props }) {
  const hoverClass = hover ? 'hover:-translate-y-1.5 hover:shadow-lift hover:border-primary-200' : ''

  return (
    <div
      className={`bg-white rounded-3xl p-6 shadow-soft border border-steel-200/70 transition-all duration-500 ease-out-expo ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
