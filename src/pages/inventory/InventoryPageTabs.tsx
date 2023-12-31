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
  const tabTitleBaseClassname =
    'flex-1 py-4 text-xl font-extrabold sm:text-2xl ph-font-cursive hover:border-red-500 hover:text-red-800 border-b-2 outline-transparent focus-visible:border-b-transparent'
  const tabTitleActiveClassname = 'border-b-2 border-red-900 text-red-900 '

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
            className={classnames(tabTitleBaseClassname, {
              [tabTitleActiveClassname]: activeTabId === index,
              'ph-active-tab': index === activeTabId,
            })}
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
