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
          className={`bg-white rounded-2xl overflow-hidden border border-steel-200 border-s-4 transition-all duration-500 ease-out-expo ${
            openIndex === index ? 'border-s-accent shadow-lift' : 'border-s-transparent shadow-soft'
          }`}
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center p-6 text-right hover:bg-primary-50 transition-colors"
          >
            <span className="font-cairo font-bold text-primary-800 text-lg flex-1">
              {faq.q}
            </span>
            <span
              className={`text-accent text-2xl transition-transform duration-500 ease-out-expo ${
                openIndex === index ? 'rotate-45' : ''
              }`}
            >
              +
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-out-expo ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="p-6 pt-0 text-steel-600 leading-relaxed">
              {faq.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
