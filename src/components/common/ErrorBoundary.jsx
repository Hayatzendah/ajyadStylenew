import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import Button from './Button'

class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service in production
    if (import.meta.env.PROD) {
      console.error('Error caught by boundary:', error, errorInfo)
      // TODO: Send to error reporting service (e.g., Sentry)
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={() => this.setState({ hasError: false, error: null })} />
    }

    return this.props.children
  }
}

function ErrorFallback({ onReset }) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-cairo font-bold text-primary mb-4">
          {t('error.title') || 'حدث خطأ'}
        </h1>
        <p className="text-black mb-6">
          {t('error.message') || 'عذراً، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'}
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={onReset}>
            {t('error.retry') || 'إعادة المحاولة'}
          </Button>
          <Button variant="outline" to="/">
            {t('error.home') || 'العودة للرئيسية'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function ErrorBoundary({ children }) {
  return <ErrorBoundaryClass>{children}</ErrorBoundaryClass>
}

