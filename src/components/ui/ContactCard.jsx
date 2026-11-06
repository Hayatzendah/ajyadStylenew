import Card from '../common/Card'

export default function ContactCard({ icon, title, value, href, type = 'link' }) {
  const content = (
    <>
      <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center text-4xl mb-4 transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:rotate-6">{icon}</div>
      <h3 className="text-primary-800 font-cairo font-bold text-xl mb-2">{title}</h3>
      <p className="text-steel-700 text-lg break-all">{value}</p>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={type === 'maps' ? '_blank' : undefined}
        rel={type === 'maps' ? 'noopener noreferrer' : undefined}
        className="block group"
      >
        <Card className="text-center h-full">
          {content}
        </Card>
      </a>
    )
  }

  return (
    <Card className="text-center h-full" hover={false}>
      {content}
    </Card>
  )
}
