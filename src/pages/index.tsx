import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import Spinner from '@/components/Spinner'

const IndexPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/inventory')

    requestAnimationFrame(() => {
      router.push('/inventory')
    })
  }, [router])

  return <Spinner />
}

export default IndexPage
