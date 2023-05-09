import prisma from '@/app/libs/prisma'

interface IParams {
  listingId?: string
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId } = params

    const query: any = {}

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }))

    return safeReservations
  } catch (error: any) {
    throw new Error(error)
  }
}
