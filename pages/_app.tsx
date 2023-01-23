import '../styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import '@cloudscape-design/global-styles/index.css';

if (typeof window === 'undefined') {
  React.useLayoutEffect = () => {};
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
