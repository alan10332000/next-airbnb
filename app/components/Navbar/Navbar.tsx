import Container from '@/app/components/Container'
import Categories from '@/app/components/Navbar/Categories'
import Logo from '@/app/components/Navbar/Logo'
import Search from '@/app/components/Navbar/Search'
import UserMenu from '@/app/components/Navbar/UserMenu'
import { SafeUser } from '@/app/types'

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Container>
        <Categories />
      </Container>
    </div>
  )
}

export default Navbar
