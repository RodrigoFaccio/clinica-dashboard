'use client'
import { httpClient } from "@/services/httpClient"
import { useDebounce } from "@/utils/useDebounce"
import { useEffect, useState } from "react"

export interface UserSheet {
    id: number
    userId: number
    patientId: number
    created_at: string
    patient: {
        id: number,
        name: string,

    },
    user: {
        id: number,
        username: string,
        sectorId: number,
        level: string,

    },

}

export const usePatient = (id: number) => {
    const [userSheet, setUserSheet] = useState<UserSheet[]>([])
    const [patientName, setPatientName] = useState<string>('')
    const [searchValue, setSearchValue] = useState<string>('')
    const debouncedSearchValue = useDebounce(searchValue, 500)


    const convertDate = (date: string) => {
        const dateObj = new Date(date)
        return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
    }

    const getAnswers = async () => {
        try {
            const { data } = await httpClient.get(`/answers/all/${id}`)
            const { data: userSheetData } = data
            setUserSheet(userSheetData)
            console.log(userSheetData)
            setPatientName(userSheetData[0].patient.name)
        } catch (error) {
            console.log(error)
        }
    }

    const optionsSearchValues = [
        {
            value: 'date',
            label: 'Data'
        }
    ]

    useEffect(() => {
        getAnswers()
    }, [debouncedSearchValue])

    return {
        userSheet,
        convertDate,
        patientName,
        optionsSearchValues,
        setSearchValue,
        searchValue

    }
}