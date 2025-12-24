import { useState, useMemo } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import Button from '../common/Button'

export default function QuoteRequestForm({ showTitle = true }) {
  const { t, language } = useLanguage()
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    material: '',
    thickness: '',
    length: '',
    width: '',
    pvc: '',
    packaging: '',
    quantity: '',
    unit: 'ton' // 'ton' or 'sheet'
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const materials = useMemo(() => [
    { value: '430', label: t('quoteForm.materials.430') },
    { value: '410', label: t('quoteForm.materials.410') },
    { value: '201', label: t('quoteForm.materials.201') },
    { value: '304', label: t('quoteForm.materials.304') },
    { value: 'prepainted', label: t('quoteForm.materials.prepainted') },
    { value: 'cold', label: t('quoteForm.materials.cold') },
    { value: 'galvanized', label: t('quoteForm.materials.galvanized') }
  ], [t, language])

  const thicknesses = [
    '0.3', '0.35', '0.4', '0.45', '0.5', '0.6', '0.65', '0.7', '0.8', '0.9', '1mm', '2mm', '3mm'
  ]

  const pvcOptions = [
    { value: '35', label: '35 micron' },
    { value: '50', label: '50 micron' },
    { value: '75', label: '75 micron' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleMaterialSelect = (value) => {
    setFormData((prev) => ({ ...prev, material: value }))
    if (errors.material) {
      setErrors((prev) => ({ ...prev, material: '' }))
    }
  }

  const handleThicknessSelect = (value) => {
    setFormData((prev) => ({ ...prev, thickness: value }))
    if (errors.thickness) {
      setErrors((prev) => ({ ...prev, thickness: '' }))
    }
  }

  const handleUnitToggle = (unit) => {
    setFormData((prev) => ({ ...prev, unit }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = t('quoteForm.errors.name')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('quoteForm.errors.email')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('quoteForm.errors.emailInvalid')
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('quoteForm.errors.phone')
    }

    if (!formData.material) {
      newErrors.material = t('quoteForm.errors.material')
    }

    if (!formData.thickness) {
      newErrors.thickness = t('quoteForm.errors.thickness')
    }

    if (!formData.length || formData.length.trim() === '') {
      newErrors.length = t('quoteForm.errors.length')
    }

    if (!formData.width || formData.width.trim() === '') {
      newErrors.width = t('quoteForm.errors.width')
    }

    if (!formData.quantity || formData.quantity.trim() === '' || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = t('quoteForm.errors.quantity')
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
      // Get material label
      const materialLabel = materials.find(m => m.value === formData.material)?.label || formData.material
      
      const response = await fetch('https://formspree.io/f/xjgblygw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: t('quoteForm.title'),
          'نوع النموذج': t('quoteForm.title'),
          'الاسم': formData.name,
          'رقم الهاتف': formData.phone,
          'البريد الإلكتروني': formData.email,
          'الخامة': materialLabel,
          'السمك': formData.thickness,
          'الطول': formData.length,
          'العرض': formData.width,
          'PVC (الطبقة الحامية)': formData.pvc ? pvcOptions.find(p => p.value === formData.pvc)?.label || formData.pvc : t('quoteForm.pvc'),
          'التغليف الخارجي': formData.packaging || t('quoteForm.packaging'),
          'الكمية': `${formData.quantity} ${formData.unit === 'ton' ? t('quoteForm.unitTon').split(' / ')[0] : t('quoteForm.unitSheet').split(' / ')[0]}`,
          _format: 'plain'
        })
      })

      if (response.ok) {
        setIsSubmitted(true)
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            phone: '',
            email: '',
            material: '',
            thickness: '',
            length: '',
            width: '',
            pvc: '',
            packaging: '',
            quantity: '',
            unit: 'ton'
          })
          setIsSubmitted(false)
        }, 3000)
      } else {
        throw new Error('فشل إرسال الطلب')
      }
    } catch (error) {
      setErrors({ submit: t('quoteForm.errors.submit') })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-xl p-8 text-center border border-mutedGray">
        <div className="text-6xl mb-4 text-primary">✓</div>
        <h3 className="text-primary font-cairo font-bold text-2xl mb-2">
          {t('quoteForm.successTitle')}
        </h3>
        <p className="text-black">
          {t('quoteForm.successMessage')}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-mutedGray">
      {/* Title */}
      {showTitle && (
        <h2 className="text-2xl md:text-3xl font-cairo font-bold text-primary text-center mb-8">
          {t('quoteForm.title')}
        </h2>
      )}

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Name */}
        <div>
          <label className="block text-primary font-cairo font-bold mb-2">
            {t('quoteForm.name')} <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors.name ? 'border-accent' : 'border-mutedGray'
            } rounded-lg px-4 py-3 text-black focus:outline-none focus:border-primary transition-colors`}
            placeholder={t('quoteForm.placeholders.name')}
          />
          {errors.name && (
            <p className="text-accent text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-primary font-cairo font-bold mb-2">
            {t('quoteForm.phone')} <span className="text-accent">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors.phone ? 'border-accent' : 'border-mutedGray'
            } rounded-lg px-4 py-3 text-black focus:outline-none focus:border-primary transition-colors`}
            placeholder={t('quoteForm.placeholders.phone')}
          />
          {errors.phone && (
            <p className="text-accent text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-primary font-cairo font-bold mb-2">
          {t('quoteForm.email')} <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full bg-white border ${
            errors.email ? 'border-accent' : 'border-mutedGray'
          } rounded-lg px-4 py-3 text-black focus:outline-none focus:border-primary transition-colors`}
          placeholder={t('quoteForm.placeholders.email')}
        />
        {errors.email && (
          <p className="text-accent text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-mutedGray my-8"></div>

      {/* Material Selection */}
      <div className="mb-6">
        <label className="block text-primary font-cairo font-bold mb-3">
          {t('quoteForm.material')} <span className="text-accent">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {materials.map((material) => (
            <button
              key={material.value}
              type="button"
              onClick={() => handleMaterialSelect(material.value)}
              className={`px-4 py-3 rounded-lg border-2 font-cairo transition-all duration-200 ${
                formData.material === material.value
                  ? 'bg-primary text-white border-primary shadow-lg scale-105'
                  : 'bg-white text-black border-mutedGray hover:border-primary hover:shadow-md'
              }`}
            >
              {material.label}
            </button>
          ))}
        </div>
        {errors.material && (
          <p className="text-accent text-sm mt-2">{errors.material}</p>
        )}
      </div>

      {/* Thickness Selection */}
      <div className="mb-6">
        <label className="block text-primary font-cairo font-bold mb-3">
          {t('quoteForm.thickness')} <span className="text-accent">*</span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {thicknesses.map((thickness) => (
            <button
              key={thickness}
              type="button"
              onClick={() => handleThicknessSelect(thickness)}
              className={`px-3 py-2 rounded-lg border-2 font-cairo text-sm transition-all duration-200 ${
                formData.thickness === thickness
                  ? 'bg-primary text-white border-primary shadow-lg scale-105'
                  : 'bg-white text-black border-mutedGray hover:border-primary hover:shadow-md'
              }`}
            >
              {thickness}
            </button>
          ))}
        </div>
        {errors.thickness && (
          <p className="text-accent text-sm mt-2">{errors.thickness}</p>
        )}
      </div>

      {/* Dimensions */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-primary font-cairo font-bold mb-2">
            {t('quoteForm.length')} <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            name="length"
            value={formData.length}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors.length ? 'border-accent' : 'border-mutedGray'
            } rounded-lg px-4 py-3 text-black focus:outline-none focus:border-primary transition-colors`}
            placeholder={t('quoteForm.placeholders.length')}
          />
          {errors.length && (
            <p className="text-accent text-sm mt-1">{errors.length}</p>
          )}
        </div>

        <div>
          <label className="block text-primary font-cairo font-bold mb-2">
            {t('quoteForm.width')} <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            name="width"
            value={formData.width}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errors.width ? 'border-accent' : 'border-mutedGray'
            } rounded-lg px-4 py-3 text-black focus:outline-none focus:border-primary transition-colors`}
            placeholder={t('quoteForm.placeholders.width')}
          />
          {errors.width && (
            <p className="text-accent text-sm mt-1">{errors.width}</p>
          )}
        </div>
      </div>

      {/* PVC Selection */}
      <div className="mb-6">
        <label className="block text-primary font-cairo font-bold mb-3">
          {t('quoteForm.pvc')}
        </label>
        <div className="grid grid-cols-3 gap-3">
          {pvcOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleChange({ target: { name: 'pvc', value: option.value } })}
              className={`px-4 py-3 rounded-lg border-2 font-cairo transition-all duration-200 ${
                formData.pvc === option.value
                  ? 'bg-primary text-white border-primary shadow-lg scale-105'
                  : 'bg-white text-black border-mutedGray hover:border-primary hover:shadow-md'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Packaging */}
      <div className="mb-6">
        <label className="block text-primary font-cairo font-bold mb-2">
          {t('quoteForm.packaging')}
        </label>
        <input
          type="text"
          name="packaging"
          value={formData.packaging}
          onChange={handleChange}
          className="w-full bg-white border border-mutedGray rounded-lg px-4 py-3 text-black focus:outline-none focus:border-primary transition-colors"
          placeholder={t('quoteForm.placeholders.packaging')}
        />
      </div>

      {/* Quantity with Unit Toggle */}
      <div className="mb-6">
        <label className="block text-primary font-cairo font-bold mb-3">
          {t('quoteForm.quantity')} <span className="text-accent">*</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="flex-1">
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full bg-white border ${
                errors.quantity ? 'border-accent' : 'border-mutedGray'
              } rounded-lg px-4 py-3 text-black focus:outline-none focus:border-primary transition-colors`}
              placeholder={t('quoteForm.placeholders.quantity')}
            />
            {errors.quantity && (
              <p className="text-accent text-sm mt-1">{errors.quantity}</p>
            )}
          </div>
          
          {/* Unit Toggle */}
          <div className="flex gap-2 bg-mutedGray/20 rounded-lg p-1 flex-shrink-0">
            <button
              type="button"
              onClick={() => handleUnitToggle('ton')}
              className={`px-3 py-3 md:px-4 rounded-md font-cairo font-bold text-sm md:text-base transition-all duration-200 ${
                formData.unit === 'ton'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-black hover:bg-mutedGray/40'
              }`}
            >
              {t('quoteForm.unitTon')}
            </button>
            <button
              type="button"
              onClick={() => handleUnitToggle('sheet')}
              className={`px-3 py-3 md:px-4 rounded-md font-cairo font-bold text-sm md:text-base transition-all duration-200 ${
                formData.unit === 'sheet'
                  ? 'bg-primary text-white shadow-md'
                  : 'text-black hover:bg-mutedGray/40'
              }`}
            >
              {t('quoteForm.unitSheet')}
            </button>
          </div>
        </div>
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
        {isSubmitting ? t('quoteForm.submitting') : t('quoteForm.submit')}
      </Button>
    </form>
  )
}

