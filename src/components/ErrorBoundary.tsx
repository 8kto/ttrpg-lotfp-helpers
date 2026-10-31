import { t, Trans } from '@lingui/macro'
import React, { Component } from 'react'

import { clearStoredInventory } from '@/state/InventoryState'

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

  handleResetClick = () => {
    if (confirm(t`Delete the saved inventory? This cannot be undone.`)) {
      clearStoredInventory()
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='relative flex flex-grow flex-col pt-16 mt-10'>
          <main className='mx-auto w-full max-w-screen-2xl flex-grow px-2.5 sm:px-6 lg:px-8'>
            <h1 className='mb-4 hidden text-2xl font-extrabold text-red-900 sm:text-3xl lg:inline-block'>
              <Trans>Bad things happened</Trans>
            </h1>

            <p className='mt-2'>
              <Trans>Let&apos;s fix them.</Trans>
            </p>

            <p className='mt-2'>
              <Trans>Error</Trans>:{' '}
              <code>{this.state.errorMessage ?? 'NA'}</code>
            </p>
            <p className='mt-2'>
              <Trans>
                Sometimes, the issue may be due to incompatible or corrupted
                saved data. Resetting it removes your stored inventory.
              </Trans>
            </p>

            <button
              type='button'
              className='ph-btn-primary mt-4 justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
              onClick={() => {
                this.setState({ hasError: false, errorMessage: null })
                window.location.reload()
              }}
            >
              <Trans>Try again?</Trans>
            </button>
            <button
              type='button'
              className='ph-btn-secondary ml-2 mt-4 justify-center rounded px-5 py-2.5 text-center font-medium focus:outline-none focus:ring-4 focus:ring-primary-300'
              onClick={this.handleResetClick}
            >
              <Trans>Reset saved data</Trans>
            </button>
          </main>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
