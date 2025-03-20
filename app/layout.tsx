import * as React from 'react'
import { NextAppProvider } from '@toolpad/core/nextjs'
import Image from 'next/image'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import ChatIcon from '@mui/icons-material/Chat'
import LinearProgress from '@mui/material/LinearProgress'
import type { Navigation } from '@toolpad/core/AppProvider'
import { AppProvider } from './contexts/AppContext'
import './globals.css'
import theme from '../theme'

export const metadata = {
  title: 'Chatbot AI',
  description: 'Ask me anything!',
}

const NAVIGATION: Navigation = [
  {
    segment: '',
    title: 'Chat',
    icon: <ChatIcon />,
  },
]

const BRANDING = {
  title: 'Bulerez Chatbot',
  // logo: <Image src='https://bulerez.com/assets/logo.svg' width={500} height={500} alt='Bulerez logo' />,
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='en' data-toolpad-color-scheme='light' suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <React.Suspense fallback={<LinearProgress />}>
            <NextAppProvider navigation={NAVIGATION} branding={BRANDING} theme={theme}>
              <AppProvider>{props.children}</AppProvider>
            </NextAppProvider>
          </React.Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
