'use client'

import { useState, useMemo } from 'react'

import Container from '@/app/components/Container'
import ListingHead from '@/app/components/Listing/ListingHead'
import ListingInfo from '@/app/components/Listing/ListingInfo'
import { categories } from '@/app/components/Navbar/Categories'
import { SafeListing, SafeReservation, SafeUser } from '@/app/types'

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser
  }
  reservations?: SafeReservation[]
  currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, reservations = [], currentUser }) => {
  const [isLoading, setIsLoading] = useState(false)

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
