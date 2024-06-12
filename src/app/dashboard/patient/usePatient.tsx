import { httpClient } from "@/services/httpClient"
import { useCallback, useState, useEffect } from 'react'
import { useDebounce } from "@/utils/useDebounce"

type FormUser = {
    name: string;
}

export const usePatient = () => {
    const [pacients, setPacients] = useState<[] | null>(null)
    const [idDelete, setIdDelete] = useState<number | null>()
    const [idEdit, setIdEdit] = useState<number | null>()
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)
    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState<boolean>(false)
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false)
    const [formUser, setFormUser] = useState<FormUser>({
        name: '',
    })
    const [searchType, setSearchType] = useState<string>('')

    const [searchValue, setSearchValue] = useState<string>('')

    const debouncedSearchValue = useDebounce(searchValue, 500)

    const optionsSearchValues = [
        {
            value: 'date',
            label: 'Data'
        },
        {
            value: 'text',
            label: 'Nome'
        }
    ]

    const handleRegisterUser = async () => {
        try {
            const res = await httpClient.post('/patients/create', {
                name: formUser.name
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setIsModalRegisterOpen(false)
            seachPatients()
        }
    }

    const handleNameChange = (newName: string) => {
        setFormUser(prevState => ({ ...prevState, name: newName }));
    };


    const seachPatients = async () => {
        try {
            if (searchType === 'date') {
                const { data } = await httpClient.get('/patients', {
                    params: {
                        date: searchValue
                    }
                }
                )
                const { data: dataPacients } = data
                setPacients(dataPacients)
            } else {
                const { data } = await httpClient.get('/patients', {
                    params: {
                        name: searchValue
                    }
                }
                )
                const { data: dataPacients } = data
                setPacients(dataPacients)
            }
        }
        catch (error) {
            console.log()
        }

    }

    useEffect(() => {
        seachPatients()
    }, [debouncedSearchValue])


    const handleOpenModalRegister = () => {
        setFormUser({
            name: '',
        })
        setIsModalRegisterOpen((prev) => !prev)
    }

    const handleOpenModalEdit = (id: number) => {
        setIsModalEditOpen((prev) => !prev)
        setIdEdit(id)
    }

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
    const handleEditPacients = async (id: number) => {
        try {
            const res = await httpClient.put(`/patients/${id}`, {
                name: formUser.name
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setIsModalEditOpen(false)
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
        handleOpenModalRegister,
        isModalRegisterOpen,
        handleNameChange,
        formUser,
        handleRegisterUser,
        setSearchValue,
        searchValue,
        setSearchType,
        searchType,
        optionsSearchValues,
        handleOpenModalEdit,
        isModalEditOpen,
        idEdit,
        handleEditPacients,
        setIsModalRegisterOpen,
        setIsModalEditOpen
    }
}