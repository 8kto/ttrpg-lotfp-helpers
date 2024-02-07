import { useRouter } from 'next/router'
import { useEffect } from 'react'

const IndexPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/inventory')

    requestAnimationFrame(() => {
      router.push('/inventory')
    })
  }, [router])

  return null // Render nothing or a loader while redirecting
}

export default IndexPage
