import { useState } from "react"
import { useRouter } from "next/router"
import { useRouter as navigation } from "next/navigation"

export const MenuAside = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const { pathname } = useRouter()

    const { push } = navigation()

    console.log(pathname)

    const handleModalRegister = () => {
        setIsModalOpen((prevState) => !prevState)
    }

    const registerUser = (navigation: string) => {
        if (pathname.includes('patient' || 'therapist')) {
            return
        } else {
            push(navigation)
        }
    }

    return (
        <div className="relative ">
            <p onClick={handleModalRegister}>Cadastrar</p>
            {
                isModalOpen && (
                    <div className="absolute">
                        <p onClick={() => registerUser('patient')} >Paciente</p>
                        <p onClick={() => registerUser('therapist')}></p>
                    </div>
                )
            }
        </div>
    )
}