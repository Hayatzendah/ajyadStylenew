import { Link } from 'react-router-dom'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const baseStyles = 'btn-shine inline-flex items-center justify-center gap-2 font-cairo font-bold rounded-full transition-all duration-500 ease-out-expo active:scale-95 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white'

  const variants = {
    primary: 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow-primary shadow-inner-light hover:from-primary-400 hover:to-primary-600 focus:ring-primary-400',
    secondary: 'bg-gradient-to-br from-accent-500 to-accent-700 text-white shadow-glow-accent shadow-inner-light focus:ring-accent',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    accent: 'bg-gradient-to-br from-accent-500 to-accent-700 text-white shadow-glow-accent shadow-inner-light hover:from-accent-400 hover:to-accent-600 focus:ring-accent'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  )
}
