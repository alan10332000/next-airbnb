'use client'

import axios from 'axios'
import { differenceInDays, eachDayOfInterval } from 'date-fns'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Range } from 'react-date-range'
import { toast } from 'react-hot-toast'

import Container from '@/app/components/Container'
import ListingHead from '@/app/components/Listing/ListingHead'
import ListingInfo from '@/app/components/Listing/ListingInfo'
import ListingReservation from '@/app/components/Listing/ListingReservation'
import { categories } from '@/app/components/Navbar/Categories'
import useLoginModal from '@/app/hooks/useLoginModal'
import { SafeListing, SafeReservation, SafeUser } from '@/app/types'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser
  }
  reservations?: SafeReservation[]
  currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, reservations = [], currentUser }) => {
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category)
  }, [listing.category])

  const onCreateReservation = useCallback(async () => {
    try {
      if (!currentUser) return loginModal.onOpen()
      setIsLoading(true)

      await axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })

      toast.success('Listing reserved!')
      setDateRange(initialDateRange)
    } catch (error) {
      console.log('error', error)
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }, [totalPrice, dateRange, listing?.id, currentUser, loginModal])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate)

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

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
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
