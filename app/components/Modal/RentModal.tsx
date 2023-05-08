'use client'

import { useState, useMemo } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import Heading from '@/app/components/Heading'
import CategoryInput from '@/app/components/Input/CategoryInput'
import Modal from '@/app/components/Modal/Modal'
import { categories } from '@/app/components/Navbar/Categories'
import useRentModal from '@/app/hooks/useRentModal'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {}

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
