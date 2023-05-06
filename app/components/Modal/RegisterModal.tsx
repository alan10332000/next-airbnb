'use client'

import axios from 'axios'
import { useState, useCallback } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import Button from '../Button'
import Heading from '../Heading'
import Input from '../Input/Input'

import Modal from './Modal'

import useRegisterModal from '@/app/hooks/useRegisterModal'

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true)

      await axios.post('/api/register', data)

      registerModal.onClose()
    } catch (error) {
      console.log('error', error)
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  const onToggle = useCallback(() => {
    registerModal.onClose()
  }, [registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}} />
      <Button outline label="Continue with GitHub" icon={AiFillGithub} onClick={() => {}} />
      <div className="mt-4 text-center font-light text-neutral-500">
        <p>
          Already have an account?
          <span onClick={onToggle} className="cursor-pointer text-neutral-800 hover:underline">
            {' '}
            Log in
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
