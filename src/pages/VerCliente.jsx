import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const VerCliente = () => {
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setCliente(resultado);
            } catch (e) {
                console.log(e);
            }

            setCargando(!cargando);
        };
        obtenerClienteAPI()
            .then((r) => r)
            .catch((err) => console.log(err));
    }, []);

    const { nombre, empresa, email, telephone, notas } = cliente;

    return cargando ? (
        <Spinner />
    ) : Object.keys(cliente).length === 0 ? (
        <p className='text-4xl font-black text-blue-900'>
            No hay Resultados...
        </p>
    ) : (
        <>
            <h1 className='text-4xl font-black text-blue-900'>Ver Cliente</h1>
            <p className='mt-3 font-medium text-lg'>Información del Cliente</p>

            <div
                className='bg-white px-5 py-10 mt-5 rounded-md shadow-md md:w-3/4 xl:w-3/5 mx-auto animate__animated
                animate__fadeIn'
            >
                {nombre && (
                    <p className='text-3xl text-gray-500 font-medium'>
                        <span className='text-gray-700 font-extrabold'>
                            Cliente:{' '}
                        </span>
                        {nombre}
                    </p>
                )}
                {empresa && (
                    <p className='text-xl text-gray-500 font-medium mt-2'>
                        <span className='text-gray-700 font-extrabold'>
                            Empresa:{' '}
                        </span>
                        {empresa}
                    </p>
                )}
                {email && (
                    <p className='text-xl text-gray-500 font-medium mt-2'>
                        <span className='text-gray-700 font-extrabold'>
                            Email:{' '}
                        </span>
                        {email}
                    </p>
                )}
                {telephone && (
                    <p className='text-xl text-gray-500 font-medium mt-2'>
                        <span className='text-gray-700 font-extrabold'>
                            Teléfono:{' '}
                        </span>
                        {telephone}
                    </p>
                )}
                {notas && (
                    <p className='text-xl text-gray-500 font-medium mt-2'>
                        <span className='text-gray-700 font-extrabold'>
                            Notas:{' '}
                        </span>
                        {notas}
                    </p>
                )}
            </div>
        </>
    );
};

export default VerCliente;
