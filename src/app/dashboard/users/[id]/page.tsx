'use client'
import { Header } from "@/components/Header"
import { usePatient } from "./usePatient"

export const PatientPage = ({ params }: { params: { id: string } }) => {

    const { userSheet, convertDate, patientName } = usePatient(Number(params.id))

    return (
        <div>
            <Header />
            <main className='flex flex-col items-center w-full py-10 px-40'>
                <div className='border-2 border-primary rounded-lg w-full'>
                    <div className="flex w-full justify-end">
                        <div className="bg-primary rounded-lg flex items-center justify-center py-1 px-2 w-fit">
                            <p className="text-white ">{patientName}</p>
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
                                                {/* <button className='w-8 h-8 bg-primary hover:grayscale-[25%] rounded-lg text-xs font-bold text-white' onClick={() => setIsModalDeleteOpen(true)}>
                                                        E
                                                    </button>
                                                    <button className='w-8 h-8 bg-red-500 hover:bg-red-600 rounded-lg text-xs font-bold text-white ml-2' onClick={() => preparerToDelete(Number(item.id))}>
                                                        X
                                                    </button> */}
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