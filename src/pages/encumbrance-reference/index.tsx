'use client'

import { t } from '@lingui/macro'
import type { GetStaticProps } from 'next'
import React from 'react'

import HeadMetadata from '@/components/layout/HeadMetadata'
import PageLayout from '@/components/layout/PageLayout'
import type { LOCALE_SHORT } from '@/translations/languages'
import { loadCatalog, TranslatedPageContent } from '@/translations/utils'

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadCatalog(ctx.locale!)

  return {
    props: {
      translation,
      locale: ctx.locale,
    },
  }
}

export default function EncumbranceReferencePage({
  locale,
}: {
  locale: LOCALE_SHORT
}) {
  return (
    <>
      <HeadMetadata
        title={t`Encumbrance quick reference`}
        description={t`Quick Reference on Encumbrance and Movement from the LotFP Core Rules`}
      />
      <PageLayout>
        <TranslatedPageContent
          pageName='encumbrance-reference'
          locale={locale}
        />
      </PageLayout>
    </>
  )
}
