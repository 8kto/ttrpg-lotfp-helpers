'use client'

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classnames from 'classnames'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useContext, useState } from 'react'

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

export default function InventoryPage() {
  const {
    uiState: { activeTabId },
  } = useContext(UiContext)
  const [activeTab, setActiveTab] = useState(activeTabId)
  const tabTitleBaseClassname =
    'flex-1 py-4 text-xl font-extrabold sm:text-2xl ph-font-cursive'
  const tabTitleActiveClassname = 'border-b-2 border-red-900 text-red-900 '

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
            <div className='flex border-b'>
              <button
                className={classnames(tabTitleBaseClassname, {
                  [tabTitleActiveClassname]: activeTabId === 0,
                  'text-gray-500': activeTabId !== 0,
                })}
                onClick={() => setActiveTab(0)}
              >
                Equipment
              </button>
              <button
                className={classnames(tabTitleBaseClassname, {
                  [tabTitleActiveClassname]: activeTabId === 1,
                  'text-gray-500': activeTabId !== 1,
                })}
                onClick={() => setActiveTab(1)}
              >
                Inventory
              </button>
            </div>
            <div>
              {activeTab === 0 && (
                <div className='p-4'>
                  <EquipmentList />
                </div>
              )}
              {activeTab === 1 && (
                <div className='p-4'>
                  <InventoryList />
                </div>
              )}
            </div>
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
