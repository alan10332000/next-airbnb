'use client'

import dynamic from 'next/dynamic'
import { useState, useMemo } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import Heading from '@/app/components/Heading'
import CategoryInput from '@/app/components/Input/CategoryInput'
import Counter from '@/app/components/Input/Counter'
import CountrySelect from '@/app/components/Input/CountrySelect'
import ImageUpload from '@/app/components/Input/ImageUpload'
import Modal from '@/app/components/Modal/Modal'
import { categories } from '@/app/components/Navbar/Categories'
import useRentModal from '@/app/hooks/useRentModal'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGE = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(STEPS.CATEGORY)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  })

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')

  const Map = useMemo(
    () =>
      dynamic(() => import('@/app/components/Map'), {
        ssr: false,
      }),
    []
  )

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext()
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return 'Create'
    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined
    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Which of these best describes your place?" subtitle="Pick a category" />
      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Where is your place located?" subtitle="Help guests find you!" />
        <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Share some basics about your place" subtitle="What amenities do you have?" />
        <Counter
          onChange={(value) => setCustomValue('guestCount', value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    )
  }

  if (step === STEPS.IMAGE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Add a photo of your place" subtitle="Show guests what your place looks like!" />
        <ImageUpload onChange={(value) => setCustomValue('imageSrc', value)} value={imageSrc} />
      </div>
    )
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  )
}

export default RentModal
