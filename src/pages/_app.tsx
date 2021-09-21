import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ReactNode } from 'react'

import { GlobalStyles } from '../components/GlobalStyles'
import { useVh } from '../hooks/useVh'

const AueApp = ({ Component, pageProps }: AppProps): ReactNode => {
  useVh()

  return (
    <>
      <GlobalStyles />

      <Component {...pageProps} />
    </>
  )
}

export default AueApp
