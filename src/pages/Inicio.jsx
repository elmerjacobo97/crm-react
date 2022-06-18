import { useEffect, useState } from 'react';
import Cliente from '../components/Cliente';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const Inicio = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                const url = 'http://localhost:4000/clientes';
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                setClientes(resultado);
            } catch (e) {
                console.log(e);
            }
        };
        obtenerClientesAPI()
            .then((r) => r)
            .catch((err) => console.log(err));
    }, []);

    const handleEliminar = (id) => {
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1E4FD8',
            cancelButtonColor: '#B91D1D',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const url = `http://localhost:4000/clientes/${id}`;
                    const respuesta = await fetch(url, {
                        method: 'DELETE',
                    });
                    await respuesta.json();

                    // Actualizamos el State
                    const arrayClientes = clientes.filter(
                        (cliente) => cliente.id !== id
                    );
                    setClientes(arrayClientes);
                } catch (e) {
                    console.log(e);
                }
                await Swal.fire(
                    'Eliminado!',
                    'Tu cita se ha eliminado',
                    'success'
                );
            }
        });
    };

    return (
        <>
            <h1 className='text-4xl font-black text-blue-900'>Clientes</h1>
            <p className='mt-3 font-medium text-lg'>Administra tus clientes</p>

            <table className='w-full mt-5 table-auto shadow-md bg-white animate__animated animate__fadeIn'>
                <thead className='bg-blue-700 text-white'>
                    <tr>
                        <th className='px-3 py-2'>Nombre</th>
                        <th className='px-3 py-2'>Contacto</th>
                        <th className='px-3 py-2'>Empresa</th>
                        <th className='px-3 py-2'>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {clientes.map((cliente) => (
                        <Cliente
                            key={cliente.id}
                            cliente={cliente}
                            handleEliminar={handleEliminar}
                        />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Inicio;
