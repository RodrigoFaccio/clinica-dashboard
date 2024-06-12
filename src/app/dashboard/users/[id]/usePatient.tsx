'use client'
import { httpClient } from "@/services/httpClient"
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

    useEffect(() => {
        getAnswers()
    }
        , [])

    return {
        userSheet,
        convertDate,
        patientName
    }
}