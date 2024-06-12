'use client'

import { Modal } from '@/components/Modal';
import { usePatient } from "./usePatient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { Select } from "@/components/Select/Select";
import { Header } from '@/components/Header/Header';
import { IoMdClose, IoMdCloseCircle } from 'react-icons/io';
import { AiFillEdit } from 'react-icons/ai';
import RegisterNotFound from '@/assets/images/RegisterNotFound.png'
import Image from 'next/image';

export const Dashboard: React.FC = () => {
    const [searchFilter, setSearchFilter] = useState<string>('')

    useEffect(() => {
        if (searchFilter.startsWith('text')) {
            setSearchType('text');
        } else {
            setSearchType('date');
        }
    }, [searchFilter]);

    const router = useRouter()

    const { handleDeletePacients, idDelete, isModalDeleteOpen, pacients, preparerToDelete, handleOpenModalRegister, isModalRegisterOpen, formUser, handleNameChange, handleRegisterUser, searchValue, setSearchValue, searchType, setSearchType, optionsSearchValues, handleOpenModalEdit, isModalEditOpen, handleEditPacients, idEdit, setIsModalRegisterOpen, setIsModalEditOpen, setIsModalDeleteOpen } = usePatient()

    return (
        <div className='relative'>

            {isModalRegisterOpen && (
                <Modal>
                    <button className="absolute top-3 right-4 w-fit h-fit" onClick={() => setIsModalRegisterOpen(!isModalRegisterOpen)}><IoMdCloseCircle size={24} color="red" /></button>
                    <h4 className=" text-xl text-primary font-semibold mb-3" >Cadastrar Paciente</h4>
                    <div className=" flex flex-col gap-4 w-full">
                        <div>
                            <label className="text-primary-active font-semibold" htmlFor=""> Nome </label>
                            <Input dataTestId='editPacientInput' inputType="text" onChangeText={handleNameChange} value={formUser.name} />
                        </div>
                        <Button textAlign='center' onClick={handleRegisterUser} title="Cadastrar" />
                    </div>
                </Modal>
            )}
            {isModalEditOpen && (
                <Modal>
                    <button className="absolute top-3 right-4 w-fit h-fit" onClick={() => setIsModalEditOpen(!isModalEditOpen)}><IoMdCloseCircle size={24} color="red" /></button>
                    <h4 className=" text-xl text-primary font-semibold mb-3">Editar Paciente</h4>
                    <div className=" flex flex-col gap-4 w-full">
                        <div>
                            <label className="text-primary-active font-semibold" htmlFor=""> Nome </label>
                            <Input dataTestId='editPacientInput' inputType="text" onChangeText={handleNameChange} value={formUser.name} />
                        </div>
                        <Button textAlign='center' onClick={() => handleEditPacients(Number(idEdit))} title="Salvar alteração" />
                    </div>

                </Modal>
            )}
            {isModalDeleteOpen && <Modal>
                <h4 className='max-w-[250px] mb-8'>Tem certeza que deseja excluir esse paciente?</h4>
                <div className='items-center justify-end flex w-full gap-4'>
                    <button type='button' className='border border-primary text-primary p-2 rounded-lg font-medium'
                        onClick={() => setIsModalDeleteOpen(!isModalDeleteOpen)}>Cancelar</button>
                    <button type='button' className='bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg font-medium' onClick={() => handleDeletePacients(idDelete as number)}>Sim</button>
                </div>
            </Modal>}
            <Header />
            <div className=" flex w-full justify-end px-20 gap-5">

                <div className='flex gap-2'>
                    <Select value={searchFilter} onChange={(e) => setSearchFilter(e.currentTarget.value)} label="Filtrar por:" options={optionsSearchValues} placeholder="Selecione o filtro" />
                    <div>
                        <Input dataTestId='searchPacientInput' inputType={searchType} value={searchValue} onChangeText={setSearchValue} />
                    </div>
                </div>
                <div>
                    <Button onClick={handleOpenModalRegister} textAlign="center" title="Cadastrar" />
                </div>
            </div>

            <main className='flex flex-col items-center w-full py-10 px-20'>
                <div className='border-2 border-primary rounded-lg w-full'>
                    {pacients && pacients.length === 0 ? (
                        <div className='flex flex-col mt-8 w-full items-center justify-center'>
                            <h1 className='text-primary font-semibold text-3xl'>Oops... Nenhum paciente encontrado</h1>
                            <Image src={RegisterNotFound} width={600} height={600} alt='Imagem representando nenhum registro' />
                        </div>
                    ) : (
                        <table className='min-w-full text-center text-primary  '>
                            <thead>
                                <tr className=' border-b-2 border-primary'>
                                    <th className='p-2 min-w-[100px]'>ID</th>
                                    <th className='p-2 min-w-[100px]'>Nome</th>
                                    <th className='p-2 min-w-[200px]'>Ações</th>
                                </tr>
                            </thead>
                            <tbody >
                                {
                                    pacients && pacients.map((item: any) => {
                                        return (
                                            <tr key={item.id} className='border-b-2 border-primary ' >
                                                <td className='p-2 font-semibold'>{item.id}</td>
                                                <td className='p-2 font-semibold cursor-pointer' onClick={() => router.push(`/dashboard/patient/${item.id}`)}>{item.name}</td>
                                                <td className='p-2 font-semibold'>
                                                    <button className='p-2 bg-primary hover:grayscale-[25%] rounded-lg ' onClick={() => handleOpenModalEdit(Number(item.id))}>
                                                        <AiFillEdit color="white" size={16} />
                                                    </button>
                                                    <button className='p-2 bg-red-500 hover:bg-red-600 rounded-lg  ml-2' onClick={() => preparerToDelete(Number(item.id))}>
                                                        <IoMdClose color="white" size={16} />
                                                    </button>
                                                </td>
                                            </tr>


                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    )}
                </div>

            </main>
        </div>
    );
}

export default Dashboard;
