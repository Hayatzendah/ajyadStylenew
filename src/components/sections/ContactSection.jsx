import { useState } from 'react'
import { siteData } from '../../data/site'
import { useLanguage } from '../../contexts/LanguageContext'
import Button from '../common/Button'

export default function ContactSection() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    companyName: '',
    companyAddress: '',
    email: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = t('contact.errors.fullName')
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.errors.phone')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.email')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid')
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = t('contact.errors.message')
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
          _subject: t('contact.contactNow'),
          'نوع النموذج': 'نموذج تواصل',
          'الاسم بالكامل': formData.fullName,
          'رقم الهاتف': formData.phone,
          'اسم الشركة': formData.companyName || 'غير محدد',
          'عنوان الشركة': formData.companyAddress || 'غير محدد',
          'البريد الإلكتروني': formData.email,
          'الرسالة': formData.message,
          _format: 'plain'
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            fullName: '',
            phone: '',
            companyName: '',
            companyAddress: '',
            email: '',
            message: ''
          })
          setIsSubmitted(false)
        }, 3000)
      } else {
        throw new Error('فشل إرسال الرسالة')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ submit: t('contact.errors.submit') || 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Section - About Us & Map */}
          <div>
            <h2 className="text-3xl md:text-4xl font-cairo font-bold text-primary mb-8">
              {t('contact.title')}
            </h2>

            {/* Google Map */}
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg border border-mutedGray">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.5!2d31.2130833!3d30.0614722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAzJzQxLjMiTiAzMcKwMTInNDcuMSJF!5e0!3m2!1sar!2seg!4v1234567890!5m2!1sar!2seg"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع الشركة"
              ></iframe>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="text-primary font-cairo font-bold text-lg mb-1">
                    {t('contact.whatsapp')}
                  </h3>
                  <a
                    href={siteData.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-primary transition-colors"
                  >
                    {siteData.contact.phone}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📞</span>
                </div>
                <div>
                  <h3 className="text-primary font-cairo font-bold text-lg mb-1">
                    {t('contact.phoneNumbers')}
                  </h3>
                  <a
                    href={`tel:${siteData.contact.phone}`}
                    className="text-black hover:text-primary transition-colors"
                  >
                    {siteData.contact.phone}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h3 className="text-primary font-cairo font-bold text-lg mb-2">
                    {t('contact.address')}
                  </h3>
                  <div className="space-y-1 text-black">
                    <p>
                      <strong>{t('contact.management')}:</strong> {t('contact.managementAddress')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="bg-primary rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-cairo font-bold text-white mb-4">
                {t('contact.contactNow')}
              </h2>
              <p className="text-white/80 text-lg mb-8">
                {t('contact.description')}
              </p>

              {isSubmitted ? (
                <div className="bg-white rounded-xl p-8 text-center">
                  <div className="text-6xl mb-4 text-primary">✓</div>
                  <h3 className="text-primary font-cairo font-bold text-2xl mb-2">
                    {t('contact.successTitle')}
                  </h3>
                  <p className="text-black">
                    {t('contact.successMessage')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-white font-cairo font-bold mb-2">
                      {t('contact.fullName')} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full bg-white border ${
                        errors.fullName ? 'border-accent' : 'border-mutedGray'
                      } rounded-lg px-4 py-3 text-black text-right focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-200`}
                      placeholder={t('contact.placeholders.fullName')}
                    />
                    {errors.fullName && (
                      <p className="text-accent text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white font-cairo font-bold mb-2">
                      {t('contact.phone')} <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full bg-white border ${
                          errors.phone ? 'border-accent' : 'border-mutedGray'
                        } rounded-lg pl-20 pr-4 py-3 text-black text-right focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-200`}
                        placeholder={t('contact.placeholders.phone')}
                        style={{ direction: 'rtl' }}
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                        <span className="text-lg">🇪🇬</span>
                        <span className="text-black text-sm font-medium">+20</span>
                      </div>
                    </div>
                    {errors.phone && (
                      <p className="text-accent text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-white font-cairo font-bold mb-2">
                      {t('contact.companyName')}
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full bg-white border border-mutedGray rounded-lg px-4 py-3 text-black text-right focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-200"
                      placeholder={t('contact.placeholders.companyName')}
                    />
                  </div>

                  {/* Company Address */}
                  <div>
                    <label className="block text-white font-cairo font-bold mb-2">
                      {t('contact.companyAddress')}
                    </label>
                    <input
                      type="text"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleChange}
                      className="w-full bg-white border border-mutedGray rounded-lg px-4 py-3 text-black text-right focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-200"
                      placeholder={t('contact.placeholders.companyAddress')}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white font-cairo font-bold mb-2">
                      {t('contact.email')} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-white border ${
                        errors.email ? 'border-accent' : 'border-mutedGray'
                      } rounded-lg px-4 py-3 text-black text-right focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-200`}
                      placeholder="example@domain.com"
                    />
                    {errors.email && (
                      <p className="text-accent text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white font-cairo font-bold mb-2">
                      {t('contact.message')} <span className="text-accent">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className={`w-full bg-white border ${
                        errors.message ? 'border-accent' : 'border-mutedGray'
                      } rounded-lg px-4 py-3 text-black text-right focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-200 resize-none`}
                      placeholder={t('contact.placeholders.message')}
                    />
                    {errors.message && (
                      <p className="text-accent text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Error */}
                  {errors.submit && (
                    <p className="text-accent text-sm text-center">{errors.submit}</p>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-black hover:bg-black/90 text-white border-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (t('contact.sending') || 'جاري الإرسال...') : t('contact.send')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

