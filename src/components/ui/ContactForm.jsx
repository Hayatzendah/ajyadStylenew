import { useState } from 'react'
import Button from '../common/Button'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'الاسم مطلوب ويجب أن يكون حرفين على الأقل'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح'
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'الرسالة مطلوبة ويجب أن تكون 10 أحرف على الأقل'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/xjgblygw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: 'رسالة جديدة من صفحة تواصل معنا',
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          _format: 'plain'
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({ name: '', phone: '', email: '', message: '' })
          setIsSubmitted(false)
        }, 3000)
      } else {
        throw new Error('فشل إرسال الرسالة')
      }
    } catch (error) {
      setErrors({ submit: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-mutedGray">
        <div className="text-6xl mb-4 text-primary">✓</div>
        <h3 className="text-primary font-cairo font-bold text-2xl mb-2">
          تم إرسال رسالتك بنجاح!
        </h3>
        <p className="text-black">
          سنتواصل معك في أقرب وقت ممكن
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-mutedGray">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Name */}
        <div>
          <label className="block text-primary font-cairo font-bold mb-2">
            الاسم <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors.name ? 'border-accent' : 'border-mutedGray'
            } rounded-lg px-4 py-3 text-black focus:outline-none focus:border-primary transition-colors`}
            placeholder="أدخل اسمك"
          />
          {errors.name && (
            <p className="text-accent text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-primary font-cairo font-bold mb-2">
            رقم الهاتف
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-white border border-mutedGray rounded-lg px-4 py-3 text-black focus:outline-none focus:border-primary transition-colors"
            placeholder="اختياري"
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-primary font-cairo font-bold mb-2">
          البريد الإلكتروني <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full bg-white border ${
            errors.email ? 'border-accent' : 'border-mutedGray'
          } rounded-lg px-4 py-3 text-black focus:outline-none focus:border-primary transition-colors`}
          placeholder="example@domain.com"
        />
        {errors.email && (
          <p className="text-accent text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Message */}
      <div className="mb-6">
        <label className="block text-primary font-cairo font-bold mb-2">
          الرسالة <span className="text-accent">*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          className={`w-full bg-white border ${
            errors.message ? 'border-accent' : 'border-mutedGray'
          } rounded-lg px-4 py-3 text-black focus:outline-none focus:border-primary transition-colors resize-none`}
          placeholder="اكتب رسالتك هنا..."
        />
        {errors.message && (
          <p className="text-accent text-sm mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      {errors.submit && (
        <p className="text-accent text-sm mb-4 text-center">{errors.submit}</p>
      )}
      <Button 
        type="submit" 
        size="lg" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
      </Button>
    </form>
  )
}
