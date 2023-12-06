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
import UiContext from '@/shared/context/uiContext'
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
  const { uiState } = useContext(UiContext)
  const [activeTabId, setActiveTabId] = useState(uiState.activeTabId)
  const tabTitleBaseClassname =
    'flex-1 py-4 text-xl font-extrabold sm:text-2xl ph-font-cursive'
  const tabTitleActiveClassname = 'border-b-2 border-red-900 text-red-900 '

  // Error handling for out-of-range activeTabId
  const isValidTabId = activeTabId >= 0 && activeTabId < tabs.length
  const ActiveTab = isValidTabId ? tabs[activeTabId].component : null

  useEffect(() => {
    setActiveTabId(uiState.activeTabId)
  }, [uiState.activeTabId])

  return (
    <>
      <div className='flex border-b'>
        {tabs.map((item, index) => (
          <button
            key={item.title}
            className={classnames(tabTitleBaseClassname, {
              [tabTitleActiveClassname]: activeTabId === index,
            })}
            onClick={() => setActiveTabId(index)}
          >
            {item.title}
          </button>
        ))}
      </div>

      {ActiveTab && <ActiveTab />}
    </>
  )
}

export default function InventoryPage() {
  // Subscribe to the locale updates
  useLingui()

  return (
    <>
      <Head>
        <title>{t`Inventory`}</title>
      </Head>
      <div className='relative flex min-h-screen flex-col bg-gray-50 pt-16'>
        <main className='mx-auto w-full max-w-screen-2xl flex-grow px-4 sm:px-6 lg:px-8'>
          {/* Tabs for smaller screens */}
          <div className='mt-6 bg-white lg:hidden'>
            <Tabs
              tabs={[
                { title: t`Equipment`, component: EquipmentList },
                { title: t`Inventory`, component: InventoryList },
              ]}
            />
          </div>
          {/* Two columns for lg and wider screens */}
          <div className='mt-6 hidden lg:grid lg:grid-cols-2 lg:gap-4 xl:grid-cols-3'>
            <div className='col-span-1 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:col-span-1 xl:col-span-2'>
              <EquipmentList />
            </div>
            <div className='col-span-1 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:col-span-1 xl:col-span-1'>
              <InventoryList />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

// TODO match viewport programmatically no to render components twice
// FIXME this above should also fix the broken labels for City/Rural cost
