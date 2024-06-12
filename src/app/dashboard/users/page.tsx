'use client'
import { Header } from "../../../components/Header/Header";
import { Modal } from '@/components/Modal';
import { useDashboard } from "./useUsers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { Select } from "@/components/Select/Select";
import { IoMdCloseCircle } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import RegisterNotFound from '@/assets/images/RegisterNotFound.png'

export const Dashboard: React.FC = () => {
    const [searchFilter, setSearchFilter] = useState<string>('')

    useEffect(() => {
        if (searchFilter === 'text') {
            setSearchType('text');
        } else {
            setSearchType('date');
        }
    }, [searchFilter]);

    const router = useRouter()

    const { handleDeletePacients, idDelete, isModalDeleteOpen, users, preparerToDelete, setIsModalDeleteOpen, handleOpenModalRegister, isModalRegisterOpen, formUser, handleNameChange, handleRegisterUser, searchValue, setSearchValue, searchType, setSearchType, optionsSearchValues, sector, levelValues, handleSector, handleLevel } = useDashboard()


    return (
        <div className='relative'>
            {isModalRegisterOpen && (
                <Modal>
                    <button className="absolute top-3 right-4 w-fit h-fit" onClick={handleOpenModalRegister}><IoMdCloseCircle size={24} color="red" /></button>
                    <h1 className=" text-xl text-primary font-semibold mb-3">Cadastrar Terapeuta</h1>
                    <div className=" flex flex-col gap-4 w-full">
                        <div>
                            <label className="text-primary-active font-semibold" htmlFor=""> Nome </label>
                            <Input dataTestId="editUserName" inputType="text" onChangeText={handleNameChange} value={formUser.name} />
                        </div>
                        <div>
                            <label className="text-primary-active font-semibold" htmlFor=""> Setor </label>
                            <Select type="unique" value={String(formUser.sector)} onChange={(e) => handleSector(Number(e.currentTarget.value))} label="Setor" options={sector} placeholder="Selecione o setor " />
                        </div>
                        <div>
                            <label className="text-primary-active font-semibold" htmlFor="">Nível de acesso </label>
                            <Select type="unique" value={formUser.level} onChange={(e) => handleLevel(e.currentTarget.value)} label="Nivel de acesso" options={levelValues} placeholder="Nível de acesso " />
                        </div>


                        <Button textAlign="center" onClick={handleRegisterUser} title="Cadastrar" />
                    </div>
                </Modal>
            )}
            {isModalDeleteOpen && (
                <Modal>
                    <h4 className='max-w-[250px] mb-8'>Tem certeza que deseja excluir esse paciente?</h4>
                    <div className='items-center justify-end flex w-full gap-4'>
                        <button type='button' className='border border-primary text-primary p-2 rounded-lg font-medium' onClick={() => setIsModalDeleteOpen(!isModalDeleteOpen)}>Cancelar</button>
                        <button type='button' className='bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg font-medium' onClick={() => handleDeletePacients(idDelete as number)}>Sim</button>
                    </div>
                </Modal>
            )}
            <Header />
            <div className=" flex w-full justify-end px-20 gap-5">

                <div className='flex gap-2'>
                    <Select value={searchFilter} onChange={(e) => setSearchFilter(e.currentTarget.value)} label="Filtrar por:" options={optionsSearchValues} placeholder="Selecione o filtro" />
                    <div>
                        <Input dataTestId="userSearchFilter" inputType={searchType} value={searchValue} onChangeText={setSearchValue} />
                    </div>
                </div>
                <div>
                    <Button onClick={handleOpenModalRegister} textAlign="center" title="Cadastrar" />
                </div>
            </div>

            <main className='flex flex-col items-center w-full py-10 px-20'>
                <div className='border-2 border-primary rounded-lg w-full'>
                    {users && users.length === 0 ? (
                        <div className='flex flex-col mt-8 w-full items-center justify-center'>
                            <h1 className='text-primary font-semibold text-3xl'>Oops... Nenhum terapeuta encontrado</h1>
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
                                    users && users.map((item: any) => {
                                        return (
                                            <tr key={item.id} className='border-b-2 border-primary ' >
                                                <td className='p-2 font-semibold'>{item.id}</td>
                                                <td className='p-2 font-semibold cursor-pointer' onClick={() => { }}>{item.username}</td>
                                                <td className='p-2 font-semibold'>
                                                    {/* <button className='p-2 bg-primary hover:grayscale-[25%] rounded-lg ' onClick={() => setIsModalDeleteOpen(true)}>
                                                    <AiFillEdit color="white" size={16} />
                                                </button> */}
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
