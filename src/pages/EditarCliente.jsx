import Formulario from '../components/Formulario';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const EditarCliente = () => {
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
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

    return (
        <>
            <h1 className='text-4xl font-black text-blue-900'>
                Editar Cliente
            </h1>
            <p className='mt-3 font-medium text-lg'>
                Utiliza este formulario para editar datos de un cliente
            </p>

            {cargando ? (
                <Spinner />
            ) : cliente?.nombre ? (
                <Formulario cliente={cliente} cargando={cargando} />
            ) : (
                <p className='text-lg font-medium mt-5'>Cliente ID no válido</p>
            )}
        </>
    );
};

export default EditarCliente;
