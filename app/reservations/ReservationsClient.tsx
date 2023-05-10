'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

import Container from '@/app/components/Container'
import Heading from '@/app/components/Heading'
import ListingCard from '@/app/components/Listing/ListingCard'
import { SafeReservation, SafeUser } from '@/app/types'

interface ReservationsClientProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({ reservations, currentUser }) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback(
    async (id: string) => {
      try {
        setDeletingId(id)

        await axios.delete(`/api/reservations/${id}`)

        toast.success('Reservation cancelled')
        router.refresh()
      } catch (error) {
        console.log('error', error)
        toast.error('Something went wrong!')
      } finally {
        setDeletingId('')
      }
    },
    [router]
  )

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient
