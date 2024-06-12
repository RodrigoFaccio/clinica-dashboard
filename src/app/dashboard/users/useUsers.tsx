import { httpClient } from "@/services/httpClient"
import { useCallback, useState, useEffect } from 'react'
import { useDebounce } from "@/utils/useDebounce"

type FormUser = {
    name: string;
    level: string;
    sector: number | string;
}

export const useDashboard = () => {
    const [users, setUsers] = useState<[] | null>(null)
    const [idDelete, setIdDelete] = useState<number | null>()
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const [isModalRegisterOpen, setIsModalRegisterOpen] = useState<boolean>(false)
    const [formUser, setFormUser] = useState<FormUser>({
        name: '',
        sector: 0,
        level: ''
    })
    const [searchType, setSearchType] = useState<string>('')

    const [searchValue, setSearchValue] = useState<string>('')
    const [sector, setSector] = useState<any[]>([])


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
    const levelValues = [
        {
            value: '1',
            label: 'Terapeuta'
        },
        {
            value: '2',
            label: 'Admin'
        }
    ]

    const handleNameChange = (newName: string) => {
        setFormUser(prevState => ({ ...prevState, name: newName }));
    };
    const handleSector = (newName: number) => {
        setFormUser(prevState => ({ ...prevState, sector: newName }));
    };
    const handleLevel = (newName: string) => {
        setFormUser(prevState => ({ ...prevState, level: newName }));
    };


    const searchUser = async () => {
        try {
            if (searchType === 'date') {
                const { data } = await httpClient.get('/user/list', {
                    params: {
                        date: searchValue
                    }
                }
                )
                const { data: dataPacients } = data
                setUsers(dataPacients)
            } else {
                const { data } = await httpClient.get('/user/list', {
                    params: {
                        name: searchValue
                    }
                }
                )
                const { data: dataPacients } = data
                setUsers(dataPacients)
            }
        }
        catch (error) {
            console.log()
        }

    }
    const searchSector = async () => {
        const { data } = await httpClient.get('/sector')
        const newData = data.data.map((item: any) => {
            return {
                value: item.id,
                label: item.name
            }
        })
        setSector(newData)
    }

    useEffect(() => {
        searchUser()
        searchSector()
    }, [debouncedSearchValue, loading])


    const handleOpenModalRegister = async () => {
        setFormUser({
            name: '',
            sector: '',
            level: ''
        })
        setIsModalRegisterOpen((prev) => !prev)
    }

    const preparerToDelete = (id: number) => {
        setIsModalDeleteOpen(true)
        setIdDelete(id)
    }

    const handleDeletePacients = async (id: number) => {
        try {
            const res = await httpClient.delete(`/user/${id}`)
        } catch (error) {
            console.log(error)
        } finally {
            setIsModalDeleteOpen(false)
            searchUser()
        }
    }

    useEffect(() => {
        searchUser()
    }, [])

    const handleRegisterUser = async () => {
        try {
            const { data } = await httpClient.post('/user/create', {
                "username": formUser.name,
                "password": '123',
                "level": "terapeuta",
                "sectorId": formUser.sector,
                "active": true
            })
            setLoading(prev => !prev)
            setIsModalRegisterOpen(prev => !prev)
        } catch (error) {
        }
    }

    return {
        isModalDeleteOpen,
        handleDeletePacients,
        idDelete,
        users,
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
        sector,
        levelValues,
        handleSector,
        handleLevel
    }
}