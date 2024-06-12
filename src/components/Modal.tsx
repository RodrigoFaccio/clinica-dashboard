'use client'
import { ReactNode } from 'react'


type ModalProps = {
    children: ReactNode
}

export const Modal = ({ children }: ModalProps) => {
    return (
        <div className=" absolute flex backdrop-blur-sm items-center justify-center w-screen h-screen z-10 drop-shadow-[0px_4px_6px_rgba(0,0,0,0.25)]">
            <div className="bg-white rounded-lg p-4 relative ">
                {children}
            </div>
        </div>
    )
}