import getCurrentUser from '@/app/actions/getCurrentUser'
import getListings, { IListingsParams } from '@/app/actions/getListings'
import Container from '@/app/components/Container'
import EmptyState from '@/app/components/EmptyState'
import ListingCard from '@/app/components/Listing/ListingCard'

interface HomeProps {
  searchParams: IListingsParams
}

export const dynamic = 'force-dynamic'

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return <EmptyState showReset />
  }

  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 pt-32 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard currentUser={currentUser} key={listing.id} data={listing} />
        ))}
      </div>
    </Container>
  )
}

export default Home
