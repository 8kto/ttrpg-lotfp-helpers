import classnames from 'classnames'
import type { ReactComponentLike } from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'

import Spinner from '@/components/Spinner'
import UiContext from '@/shared/context/uiContext'

const InventoryPageTabs = ({
  tabs,
}: {
  tabs: Array<{
    title: string
    component: ReactComponentLike
  }>
}) => {
  const {
    uiState: { activeTabId },
    updateUiState,
  } = useContext(UiContext)
  // Fix the SSR hydration quirks
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <>
        <Spinner />
      </>
    )
  }

  return (
    <>
      <div className='flex border-b' role='tablist'>
        {tabs.map((item, index) => (
          <button
            role='tab'
            key={item.title}
            suppressHydrationWarning
            className={classnames(
              'ph-font-cursive border border-b-transparent focus-visible:border-b-transparent outline-transparent',
              'bg-gray-50 text-gray-500 hover:text-red-800',
              'flex-1 py-4',
              'text-xl font-semibold tracking-wide sm:text-2xl',
              {
                'ph-active-tab bg-white text-red-900 border-none':
                  activeTabId === index,
              },
            )}
            onClick={() => updateUiState({ activeTabId: index })}
          >
            {item.title}
          </button>
        ))}
      </div>

      {tabs.map(({ component: Component, title }, index) => (
        <div
          role='tabpanel'
          suppressHydrationWarning
          className={classnames('p-4', {
            hidden: index !== activeTabId,
            'ph-active-tabpanel': index === activeTabId,
          })}
          key={title}
        >
          <Component />
        </div>
      ))}
    </>
  )
}

export default InventoryPageTabs
