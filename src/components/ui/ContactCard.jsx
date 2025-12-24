import Card from '../common/Card'

export default function ContactCard({ icon, title, value, href, type = 'link' }) {
  const content = (
    <>
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-primary font-cairo font-bold text-xl mb-2">{title}</h3>
      <p className="text-black text-lg break-all">{value}</p>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={type === 'maps' ? '_blank' : undefined}
        rel={type === 'maps' ? 'noopener noreferrer' : undefined}
        className="block"
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
