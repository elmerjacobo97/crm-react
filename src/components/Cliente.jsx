import { useNavigate } from 'react-router-dom';

const Cliente = ({ cliente, handleEliminar }) => {
    const navigate = useNavigate();

    const { nombre, empresa, email, telephone, id } = cliente;

    return (
        <tr className='border-b border-b-slate-200 hover:bg-gray-50'>
            <td className='px-3 py-2'>{nombre}</td>
            <td className='px-3 py-2'>
                <p>
                    <span className='text-gray-700 font-bold'>Email: </span>
                    {email}
                </p>
                <p>
                    <span className='text-gray-700 font-bold'>Tel: </span>
                    {telephone}
                </p>
            </td>
            <td className='px-3 py-2'>{empresa}</td>
            <td className='px-3 py-2'>
                <div className='flex justify-evenly items-center gap-x-2 lg:gap-x-0'>
                    <button
                        type='button'
                        className='text-slate-700 hover:bg-yellow-500 hover:border-transparent
                        hover:text-slate-100 rounded-full p-1 transition duration-200 active:bg-yellow-400'
                        onClick={() => navigate(`/clientes/${id}`)}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                            />
                        </svg>
                    </button>

                    <button
                        type='button'
                        className='text-slate-700 hover:bg-blue-700 hover:border-transparent
                        hover:text-slate-100 rounded-full p-1 transition duration-200 active:bg-blue-600'
                        onClick={() => navigate(`/clientes/editar/${id}`)}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                            />
                        </svg>
                    </button>

                    <button
                        type='button'
                        className='text-slate-700 hover:bg-red-600 hover:border-transparent
                        hover:text-slate-100 rounded-full p-1 transition duration-200 active:bg-red-500'
                        onClick={() => handleEliminar(id)}
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                            />
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default Cliente;
