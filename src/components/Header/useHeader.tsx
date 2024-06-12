import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useUserStore from '@/contexts/useUserStorage'

export const useHeader = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const modalRef = useRef<HTMLDivElement>(null)

    const { push } = useRouter()
    const { logout } = useUserStore((state) => state)

    const handleOpenModal = () => {
        setIsModalOpen((prevState => !prevState))
        console.log('abriu')
    }

    const handleOutsideClick = (e: any) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsModalOpen(false)
        }

    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }
        , [])

    const handleLogout = () => {
        logout
        push('/')
    }


    return {
        handleOpenModal,
        isModalOpen,
        modalRef,
        handleLogout
    }
}