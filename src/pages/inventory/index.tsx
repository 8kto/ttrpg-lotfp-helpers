'use client'

import { t } from '@lingui/macro'
import type { GetStaticProps } from 'next'
import React, { useEffect } from 'react'

import EquipmentList from '@/components/EquipmentList/EquipmentList'
import InventoryList from '@/components/Inventory/InventoryList'
import InventoryPageTabs from '@/components/InventoryPageTabs'
import HeadMetadata from '@/components/layout/HeadMetadata'
import Toast from '@/components/Toast/Toast'
import { decompressDataFromUrl } from '@/shared/helpers/compressDataForUrl'
import {
  getImportUrlParameter,
  resetUrlParams,
} from '@/shared/helpers/shareableUrl'
import useTailwindBreakpoint from '@/shared/hooks/useTailwindBreakpoint'
import type { InventoryStateType } from '@/state/InventoryState'
import { setState } from '@/state/InventoryState'
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
  // Do not render components twice: programmatically check the viewport
  const breakpoint = useTailwindBreakpoint()
  const shouldRenderTabs = ['xs', 'sm', 'md'].includes(breakpoint)

  useEffect(() => {
    const importUrlParameter = getImportUrlParameter()

    if (importUrlParameter) {
      const state =
        decompressDataFromUrl<InventoryStateType>(importUrlParameter)
      if (state) {
        setState(state)
      }

      resetUrlParams()
    }
  }, [])

  return (
    <>
      <HeadMetadata
        title={t`Inventory`}
        description={t`Encumbrance calculator, inventory manager for the LotFP TTRPG system`}
      />
      <div className='relative flex flex-grow flex-col pt-[3.6rem] md:pt-24'>
        <main className='mx-auto w-full max-w-screen-2xl flex-grow px-2.5 sm:px-6 lg:px-8 mb-4'>
          {shouldRenderTabs ? (
            /* Tabs for smaller screens */
            <div className='ph-inventory-page-content--tabs mt-6 rounded border border-gray-200 bg-white lg:hidden'>
              <InventoryPageTabs
                tabs={[
                  { title: t`Equipment`, component: EquipmentList },
                  { title: t`Inventory`, component: InventoryList },
                ]}
              />
            </div>
          ) : (
            /* Two columns for lg and wider screens */
            <div className='ph-inventory-page-content--columns hidden lg:grid lg:grid-cols-2 lg:gap-4 xl:grid-cols-3'>
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
      <Toast />
    </>
  )
}
