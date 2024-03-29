import { Nunito } from 'next/font/google'

import getCurrentUser from '@/app/actions/getCurrentUser'
import LoginModal from '@/app/components/Modal/LoginModal'
import RegisterModal from '@/app/components/Modal/RegisterModal'
import RentModal from '@/app/components/Modal/RentModal'
import SearchModal from '@/app/components/Modal/SearchModal'
import Navbar from '@/app/components/Navbar/Navbar'
import ToasterProvider from '@/app/providers/ToasterProvider'
import '@/app/globals.css'

const font = Nunito({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Airbnb',
  description: 'Welcome to Airbnb. Where to next?',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
