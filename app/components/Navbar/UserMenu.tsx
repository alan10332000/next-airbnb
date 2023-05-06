'use client'

import { useState, useCallback } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import Avatar from '@/app/components/Avatar'
import MenuItem from '@/app/components/Navbar/MenuItem'
import useRegisterModal from '@/app/hooks/useRegisterModal'

const UserMenu = () => {
  const registerModal = useRegisterModal()

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
          onClick={() => {}}
        >
          Airbnb your home
        </div>

        <div
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            <>
              <MenuItem label="Login" onClick={() => {}} />
              <MenuItem label="Sign up" onClick={registerModal.onOpen} />
            </>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
