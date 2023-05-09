'use client'

import { useState } from 'react'

import Container from '@/app/components/Container'
import ListingHead from '@/app/components/Listing/ListingHead'
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
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
