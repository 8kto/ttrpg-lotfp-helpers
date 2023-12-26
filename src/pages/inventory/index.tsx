'use client'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classnames from 'classnames'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import type { ReactComponentLike } from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'

import EquipmentList from '@/components/EquipmentList/EquipmentList'
import InventoryList from '@/components/Inventory/InventoryList'
import Spinner from '@/components/Spinner'
import UiContext from '@/shared/context/uiContext'
import useTailwindBreakpoint from '@/shared/hooks/useTailwindBreakpoint'
import { loadCatalog } from '@/translations/utils'

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!)

  return {
    props: {
      translation,
    },
  }
}

const Tabs = ({
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

export default function InventoryPage() {
  // Subscribe to the locale updates
  useLingui()

  // Do not render components twice: programmatically check the viewport
  const breakpoint = useTailwindBreakpoint()
  const shouldRenderTabs = ['xs', 'sm', 'md'].includes(breakpoint)

  return (
    <>
      <Head>
        <title>{t`Inventory`}</title>
      </Head>
      <div className='relative flex flex-grow flex-col pt-16'>
        <main className='mx-auto w-full max-w-screen-2xl flex-grow px-2.5 sm:px-6 lg:px-8'>
          {shouldRenderTabs ? (
            /* Tabs for smaller screens */
            <div className='ph-inventory-page-content--tabs mt-6 rounded border border-gray-200 bg-white lg:hidden'>
              <Tabs
                tabs={[
                  { title: t`Equipment`, component: EquipmentList },
                  { title: t`Inventory`, component: InventoryList },
                ]}
              />
            </div>
          ) : (
            /* Two columns for lg and wider screens */
            <div className='ph-inventory-page-content--columns mt-6 hidden lg:grid lg:grid-cols-2 lg:gap-4 xl:grid-cols-3'>
              <div className='col-span-1 rounded border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:col-span-1 xl:col-span-2'>
                <EquipmentList />
              </div>
              <div className='col-span-1 rounded border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:col-span-1 xl:col-span-1'>
                <InventoryList />
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
