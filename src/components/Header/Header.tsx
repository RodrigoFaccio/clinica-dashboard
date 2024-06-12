import Image from "next/image"
import logo from '@/assets/images/logo.png'
import Link from "next/link"
import { useHeader } from "./useHeader"
// import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

export const Header = () => {

    const { handleOpenModal, isModalOpen, modalRef, handleLogout } = useHeader()

    const pathname = usePathname()

    const getLinkClass = (linkPath: string) => {
        return pathname === linkPath ? true : false;
    }

    return (
        <header className="flex px-20 h-20 py-2 items-center justify-between shadow-md mb-4">
            <Link href={'/dashboard'}>
                <Image src={logo} alt="Logo" width={207} height={65} />
            </Link>
            <div
                data-path={getLinkClass('/dashboard/patient')}
                className="data-[path=true]:border-2 data-[path=true]:border-primary py-1 px-2 data-[path=true]:rounded-lg data-[path=true]:text-primary data-[path=true]:font-bold"
            >
                <Link className="text-primary font-semibold" href={'/dashboard/patient'}>Pacientes</Link>
            </div>
            <div
                data-path={getLinkClass('/dashboard/users')}
                className="data-[path=true]:border-2 data-[path=true]:border-primary py-1 px-2 data-[path=true]:rounded-lg data-[path=true]:text-primary data-[path=true]:font-bold"
            >
                <Link className="text-primary font-semibold" href={'/dashboard/users'}>Terapeutas</Link>
            </div>
            <div className="relative border-primary flex border-[1px] rounded-lg w-24 py-2 px-4 h-14 items-center justify-between" onClick={handleOpenModal}>
                <div className="rounded-full bg-primary w-7 h-7"></div>
                <p className="rotate-90 text-primary font-bold ">|||</p>
                {
                    isModalOpen && <div ref={modalRef} className="absolute top-14 right-0 w-full " >
                        <ul className="bg-white rounded-lg shadow-lg border-primary border-2">
                            <li className=" cursor-pointer px-4 py-2" onClick={handleLogout}>Sair</li>
                        </ul>
                    </div>
                }
            </div>
        </header>
    )
}