'use client'
import { Button, } from '@/components/Button'
import { Input } from '@/components/Input'
import { httpClient } from '@/services/httpClient'
import Image from 'next/image'
import { useState } from 'react'
import logo from '@/assets/images/logo.png'
import bottonBackgroundImage from '@/assets/images/bottonBackgroundImage.png'
import topBackgroundImage from '@/assets/images/topBackgroundImage.png'
import useUserStore from '@/contexts/useUserStorage'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const route = useRouter()

  const { isLogged, username, login, logout } = useUserStore((state) => state);

  const handleLogin = async () => {
    try {
      const { data } = await httpClient.post('user/login',
        {
          email,
          password
        })
      const username = data.data.username
      const token = data.data.password
      login(username, token)
      if (data.code) {
        route.push('/dashboard/patient')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 relative">
      <Image src={logo} alt='Logo' className='mt-12' />
      <h2 className='text-primary text-2xl mt-4 font-bold'>
        Bem vindo
      </h2>
      <div className='flex flex-col gap-3 mb-4 w-[370px] mt-8'>
        <Input dataTestId='username' name='username' inputType='text' onChangeText={setEmail} value={email} placeholder='Email' />
        <Input dataTestId='password' name='password' inputType='password' onChangeText={setPassword} value={password} placeholder='Senha' />
      </div>
      <div className='w-[370px]'>
        <Button data-testid='enterLogin' onClick={handleLogin} title='Entrar' textAlign='center' />
      </div>
      <Image src={bottonBackgroundImage} alt='' className='bottom-0 right-0 absolute' />
      <Image src={topBackgroundImage} alt='' className='top-0 left-0 absolute' />
    </main>
  )
}
