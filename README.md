# Airbnb Clone with Next.js

This is a repository for Airbnb Clone with Next.js

## Features 🚀

- Tailwind CSS design
- Tailwind CSS animations and effects
- Full responsiveness
- Credential authentication using NextAuth
- Google authentication using NextAuth
- GitHub authentication using NextAuth
- Image upload using Cloudinary CDN
- Client form validation and handling using react-hook-form
- Server error handling using react-toast
- Calendars with react-date-range
- Page loading state
- Page empty state
- Booking / Reservation system
- Guest reservation cancellation
- Owner reservation cancellation
- Creation and deletion of properties
- Pricing calculation
- Advanced search algorithm by category, date range, map location, number of guests, rooms and bathrooms
  - For example we will filter out properties that have a reservation in your desired date range to travel
- Favorites system
- Shareable URL filters
  - Lets say you select a category, location and date range, you will be able to share URL with a logged out friend in another browser and they will see the same results
- How to write POST and DELETE routes in route handlers (app/api)
- How to fetch data in server react components by directly accessing database
- How to handle files like error.tsx and loading.tsx which are new Next 13 template files to unify loading and error handling
- How to handle relations between Server and Child components

### Prerequisites

Node version 18.14+

### Cloning the repository

```shell
git clone git@github.com:alan10332000/next-airbnb.git
```

### Install packages

```shell
pnpm install
```

### Setup .env file

```shell
cp .env.example .env
```

### Setup Prisma

```shell
npx prisma db push
```

### Start the app

```shell
pnpm dev
```

## Declaration ⚠️

The images, content, etc. within this work are purely for personal practice and not intended for any commercial use.
