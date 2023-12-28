import React, { Component } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  errorMessage: string | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)

    this.state = { hasError: false, errorMessage: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='relative flex flex-grow flex-col pt-16 mt-10'>
          <main className='mx-auto w-full max-w-screen-2xl flex-grow px-2.5 sm:px-6 lg:px-8'>
            <h1 className='mb-4 hidden text-2xl font-extrabold text-red-900 sm:text-3xl lg:inline-block'>
              Bad things happened
            </h1>

            <p className='mt-2'>Let&apos;s fix them.</p>

            <p className='mt-2'>
              Error: <code>{this.state.errorMessage ?? 'NA'}</code>
            </p>
            <p className='mt-2'>
              Sometimes, the issue may be due to incompatible or corrupted
              <code>localStorage</code> state. Try clearing the cache and
              website data in your browser, then reload the page.
              <br />
              <strong>Note</strong>: This action will remove any stored data.
            </p>

            <button
              type='button'
              className='ph-btn-primary mt-4 justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
              onClick={() => {
                this.setState({ hasError: false, errorMessage: null })
                window.location.reload()
              }}
            >
              Try again?
            </button>
          </main>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
