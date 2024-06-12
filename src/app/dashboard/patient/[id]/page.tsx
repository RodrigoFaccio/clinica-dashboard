'use client'
import { Header } from "@/components/Header/Header"
import { usePatient } from "./usePatient"
import { BiDownload } from "react-icons/bi";
import { Select } from "@/components/Select/Select";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";

export const PatientPage = ({ params }: { params: { id: string } }) => {

    const [searchFilter, setSearchFilter] = useState<string>('')
    const [searchType, setSearchType] = useState<string>('')

    useEffect(() => {
        if (searchFilter.startsWith('text')) {
            setSearchType('text');
        } else {
            setSearchType('date');
        }
    }, [searchFilter]);

    const { userSheet, convertDate, patientName, optionsSearchValues, setSearchValue, searchValue } = usePatient(Number(params.id))

    return (
        <div>
            <Header />
            <div className=" flex w-full justify-end px-40 gap-2">
                <div className='flex gap-2'>
                    <Select value={searchFilter} onChange={(e) => setSearchFilter(e.currentTarget.value)} label="Filtrar por:" options={optionsSearchValues} placeholder="Selecione o filtro" />
                    <div>
                        <Input dataTestId='searchPacientInput' inputType={searchType} value={searchValue} onChangeText={setSearchValue} />
                    </div>
                </div>
            </div>
            <main className='flex flex-col items-center w-full py-10 px-40'>
                <div className='border-2 border-primary rounded-md w-full'>
                    <div className="flex w-full justify-start items-center mb-4" >
                        <h4 className="text-primary font-semibold text-lg ml-4 mt-4">Paciente:</h4>
                        <div className="bg-primary rounded-lg flex items-center justify-center py-1 px-2 w-fit mt-4 ml-4">

                            <p className="text-white text-lg font-medium ">{patientName}</p>
                        </div>
                    </div>

                    <table className='min-w-full text-center text-primary  '>
                        <thead>
                            <tr className=' border-b-2 border-primary'>
                                <th className='p-2 min-w-[100px]'>ID</th>
                                <th className='p-2 min-w-[100px]'>Paciente</th>


                                <th className='p-2 min-w-[100px]'>Data</th>
                                <th className='p-2 min-w-[100px]'>Terapeuta</th>

                                <th className='p-2 min-w-[200px]'>Ações</th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                userSheet?.map((item) => {
                                    return (
                                        <tr key={item.id} className='border-b-2 border-primary cursor-pointer'>
                                            <td className='p-2 font-semibold'>{item.id}</td>
                                            <td className='p-2 font-semibold'>{item.patient?.name}</td>

                                            <td className='p-2 font-semibold'>{convertDate(item.created_at)}</td>
                                            <td className='p-2 font-semibold'>{item.user?.username}</td>

                                            <td className='p-2 font-semibold'>


                                                <button className='p-2 bg-primary rounded-lg  ml-2' onClick={() => { }}>
                                                    <BiDownload color="white" size={16} />
                                                </button>
                                            </td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </main>
        </div>
    )
}

export default PatientPage