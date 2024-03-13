import Head from 'next/head'

const Fallback = () => (
  <>
    <Head>
      <title>Offline fallback</title>
    </Head>
    <p>
      <code>while True: press(&quot;F5&quot;)</code>
    </p>
  </>
)

export default Fallback
