import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ReactNode } from 'react'

import { GlobalStyles } from '../components/GlobalStyles'

const AueApp = ({ Component, pageProps }: AppProps): ReactNode => {
  return (
    <>
      <GlobalStyles />

      <Component {...pageProps} />
    </>
  )
}

export default AueApp
