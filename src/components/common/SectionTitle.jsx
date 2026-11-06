export default function SectionTitle({ title, subtitle, centered = true, className = '' }) {
  return (
    <div className={`${centered ? 'text-center' : ''} mb-12 ${className}`}>
      {subtitle && (
        <p className="inline-block text-accent font-bold text-xs md:text-sm mb-3 tracking-[0.2em] uppercase bg-accent/10 rounded-full px-4 py-1">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-cairo font-extrabold bg-gradient-to-br from-primary-600 to-steel-950 bg-clip-text text-transparent mb-5 leading-tight">
        {title}
      </h2>
      <div className={`w-24 h-1.5 rounded-full bg-gradient-to-r from-accent via-accent to-primary ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  )
}
