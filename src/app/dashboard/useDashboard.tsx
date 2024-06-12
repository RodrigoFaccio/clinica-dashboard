import { httpClient } from "@/services/httpClient"
import { useCallback, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';

interface PacientsProps {
    id: number,
    name: string
}

export const useDashboard = () => {
    const [pacients, setPacients] = useState<PacientsProps[]>([])
    const [idDelete, setIdDelete] = useState<number | null>()
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)
        ;

    const notify = (message: string) => toast(message)


    const Toast = <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
    {/* Same as */ }
    <ToastContainer />

    const seachPatients = useCallback(
        async () => {
            try {
                const { data } = await httpClient.get('/patients',)
                const { data: dataPacients } = data
                setPacients(dataPacients)
                console.log('patients', dataPacients)
                notify('Todos os pacientes foram encontrados')
            } catch (error) {
                notify('Ocorreu um erro ao buscar pacientes')
            }
        },
        [pacients],
    )

    const preparerToDelete = (id: number) => {
        setIsModalDeleteOpen(true)
        setIdDelete(id)
    }

    const handleDeletePacients = async (id: number) => {
        try {
            const res = await httpClient.delete(`/patients/${id}`)
        } catch (error) {
            console.log(error)
        } finally {
            setIsModalDeleteOpen(false)
            seachPatients()
        }
    }

    useEffect(() => {
        seachPatients()
    }, [])

    return {
        isModalDeleteOpen,
        handleDeletePacients,
        idDelete,
        pacients,
        setIsModalDeleteOpen,
        preparerToDelete,
        Toast,
    }
}