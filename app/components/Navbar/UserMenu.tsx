'use client'

import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useState, useEffect, useCallback, useRef } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import Avatar from '@/app/components/Avatar'
import MenuItem from '@/app/components/Navbar/MenuItem'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useRentModal from '@/app/hooks/useRentModal'
import { SafeUser } from '@/app/types'

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen()
    rentModal.onOpen()
  }, [loginModal, rentModal, currentUser])

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    const target = event.target as Node
    const toggleButton = document.getElementById('user-menu-toggle')

    if (toggleButton && toggleButton.contains(target)) return
    if (menuRef.current && !menuRef.current.contains(target)) setIsOpen(false)
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
          onClick={onRent}
        >
          Airbnb your home
        </div>

        <div
          id="user-menu-toggle"
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4"
        >
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => {
                    router.push('/trips')
                    toggleOpen()
                  }}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => {
                    router.push('/favorites')
                    toggleOpen()
                  }}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => {
                    router.push('/reservations')
                    toggleOpen()
                  }}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => {
                    router.push('/properties')
                    toggleOpen()
                  }}
                />
                <MenuItem
                  label="Airbnb your home"
                  onClick={() => {
                    rentModal.onOpen()
                    toggleOpen()
                  }}
                />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => {
                    loginModal.onOpen()
                    toggleOpen()
                  }}
                />
                <MenuItem
                  label="Sign up"
                  onClick={() => {
                    registerModal.onOpen()
                    toggleOpen()
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
