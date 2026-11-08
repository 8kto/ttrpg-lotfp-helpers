import classnames from 'classnames'
import type { ComponentType } from 'react'
import React, { useContext, useSyncExternalStore } from 'react'

import Spinner from '@/components/Spinner'
import UiContext from '@/shared/context/uiContext'

const subscribeToNothing = () => () => {}

const InventoryPageTabs = ({
  tabs,
}: {
  tabs: Array<{
    title: string
    component: ComponentType
  }>
}) => {
  const {
    uiState: { activeTabId },
    updateUiState,
  } = useContext(UiContext)
  // Fix the SSR hydration quirks: false on the server and during hydration
  const isMounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  )

  if (!isMounted) {
    return (
      <div className='min-h-screen'>
        <Spinner />
      </div>
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
