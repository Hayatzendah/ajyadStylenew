import { useState } from 'react'

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden border border-mutedGray"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center p-6 text-right hover:bg-primary/5 transition-colors"
          >
            <span className="font-cairo font-bold text-primary text-lg flex-1">
              {faq.q}
            </span>
            <span
              className={`text-primary text-2xl transition-transform duration-300 ${
                openIndex === index ? 'rotate-45' : ''
              }`}
            >
              +
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="p-6 pt-0 text-black leading-relaxed">
              {faq.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
