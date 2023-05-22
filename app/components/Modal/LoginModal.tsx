'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState, useCallback } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import Button from '@/app/components/Button'
import Heading from '@/app/components/Heading'
import Input from '@/app/components/Input/Input'
import Modal from '@/app/components/Modal/Modal'
import useLoginModal from '@/app/hooks/useLoginModal'
import useRegisterModal from '@/app/hooks/useRegisterModal'

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true)

      const callback = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if (callback?.ok) {
        toast.success('Logged in')
        router.refresh()
        loginModal.onClose()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    } catch (error) {
      console.log('error', error)
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  const onToggle = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        pattern={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g}
        errors={errors}
        required
      />
      {errors?.email && <div className="text-rose-500">Please enter a valid email format.</div>}
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        pattern={/^.{6,}$/}
        errors={errors}
        required
      />
      {errors?.password && <div className="text-rose-500">Please enter a password with at least 6 characters.</div>}
    </div>
  )

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn('google')} />
      <Button outline label="Continue with GitHub" icon={AiFillGithub} onClick={() => signIn('github')} />
      <div className="mt-4 text-center font-light text-neutral-500">
        <p>
          First time using Airbnb?
          <span onClick={onToggle} className="cursor-pointer text-neutral-800 hover:underline">
            {' '}
            Create an account
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
