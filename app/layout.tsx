import { Nunito } from 'next/font/google'

import RegisterModal from '@/app/components/Modal/RegisterModal'
import Navbar from '@/app/components/Navbar/Navbar'
import ToasterProvider from '@/app/providers/ToasterProvider'

import './globals.css'

const font = Nunito({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Airbnb',
  description: 'Welcome to Airbnb. Where to next?',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
