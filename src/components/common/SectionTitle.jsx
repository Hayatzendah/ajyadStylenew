export default function SectionTitle({ title, subtitle, centered = true, className = '' }) {
  return (
    <div className={`${centered ? 'text-center' : ''} mb-12 ${className}`}>
      {subtitle && (
        <p className="text-primary font-bold text-sm md:text-base mb-2 tracking-wide">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-cairo font-bold text-primary mb-4">
        {title}
      </h2>
      <div className={`w-20 h-1 bg-primary ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  )
}
