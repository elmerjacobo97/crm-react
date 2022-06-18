import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
    // console.log(cliente) -> este el cliente para editar
    // Redireccionar al usuario
    const navigate = useNavigate();

    // Definir Schema para la validación
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .max(60, 'El nombre es muy largo')
            .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string().required(
            'El nombre de la empresa es obligatorio'
        ),
        email: Yup.string()
            .email('Email no válido')
            .required('El email es obligatorio'),
        telephone: Yup.number()
            .positive('Número no válido')
            .integer('Número no válido')
            .typeError('El número no es válido'),
    });

    const handleSubmit = async (values) => {
        try {
            let respuesta;
            if (cliente.id) {
                // Editando un registro
                const url = `http://localhost:4000/clientes/${cliente.id}`;
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                // Nuevo Registro
                const url = 'http://localhost:4000/clientes';
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
            await respuesta.json();
        } catch (e) {
            console.log(e);
        }
    };

    return cargando ? (
        <Spinner />
    ) : (
        <div
            className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 xl:w-3/5 mx-auto animate__animated
            animate__fadeIn'
        >
            <h1 className='text-gray-700 font-bold text-xl uppercase text-center'>
                {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
            </h1>

            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? '', // cliente.nombre ? cliente.nombre : ''
                    empresa: cliente?.empresa ?? '',
                    email: cliente?.email ?? '',
                    telephone: cliente?.telephone ?? '',
                    notas: cliente?.notas ?? '',
                }}
                enableReinitialize={true}
                onSubmit={async (values, { resetForm }) => {
                    await handleSubmit(values);
                    // Esperar hasta que se envíe los datos y luego reiniciar y redireccionar al usuario
                    resetForm();
                    navigate('/clientes');
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({ errors, touched }) => {
                    // console.log(props)
                    // console.log(errors);
                    return (
                        <Form className='mt-5'>
                            <div className='mb-2'>
                                <label
                                    htmlFor='nombre'
                                    className='block text-lg font-medium text-slate-700'
                                >
                                    Nombre
                                </label>
                                <Field
                                    id='nombre'
                                    type='text'
                                    placeholder='Nombre del cliente'
                                    className={`${
                                        errors.nombre && touched.nombre
                                            ? 'border-red-600'
                                            : 'border-slate-300'
                                    } mt-0.5 block w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm 
                                    placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1
                                    focus:ring-blue-500 transition duration-200`}
                                    name='nombre'
                                />
                                <ErrorMessage
                                    name='nombre'
                                    component='p'
                                    className='text-red-600'
                                />
                            </div>

                            <div className='mb-2'>
                                <label
                                    htmlFor='empresa'
                                    className='block text-lg font-medium text-slate-700'
                                >
                                    Empresa
                                </label>
                                <Field
                                    id='empresa'
                                    type='text'
                                    placeholder='Empresa del cliente'
                                    className={`${
                                        errors.empresa && touched.empresa
                                            ? 'border-red-600'
                                            : 'border-slate-300'
                                    } mt-0.5 block w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm 
                                    placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1
                                    focus:ring-blue-500 transition duration-200`}
                                    name='empresa'
                                />
                                <ErrorMessage
                                    name='empresa'
                                    component='p'
                                    className='text-red-600'
                                />
                            </div>

                            <div className='mb-2'>
                                <label
                                    htmlFor='email'
                                    className='block text-lg font-medium text-slate-700'
                                >
                                    Email
                                </label>
                                <Field
                                    id='email'
                                    type='email'
                                    placeholder='Email del cliente'
                                    className={`${
                                        errors.email && touched.email
                                            ? 'border-red-600'
                                            : 'border-slate-300'
                                    } mt-0.5 block w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm 
                                    placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1
                                    focus:ring-blue-500 transition duration-200`}
                                    name='email'
                                />
                                <ErrorMessage
                                    name='email'
                                    component='p'
                                    className='text-red-600'
                                />
                            </div>

                            <div className='mb-2'>
                                <label
                                    htmlFor='phone'
                                    className='block text-lg font-medium text-slate-700'
                                >
                                    Teléfono
                                </label>
                                <Field
                                    id='phone'
                                    type='tel'
                                    className={`${
                                        errors.telephone && touched.telephone
                                            ? 'border-red-600'
                                            : 'border-slate-300'
                                    } mt-0.5 block w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm 
                                    placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1
                                    focus:ring-blue-500 transition duration-200`}
                                    name='telephone'
                                />
                                <ErrorMessage
                                    name='telephone'
                                    component='p'
                                    className='text-red-600'
                                />
                            </div>

                            <div className='mb-5'>
                                <label
                                    htmlFor='notas'
                                    className='block text-lg font-medium text-slate-700'
                                >
                                    Notas
                                </label>
                                <Field
                                    as='textarea'
                                    id='notas'
                                    type='text'
                                    placeholder='Notas del cliente'
                                    className='mt-0.5 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm
                                shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1
                                focus:ring-blue-500 transition duration-200 h-32'
                                    name='notas'
                                />
                            </div>

                            <button
                                type='submit'
                                className='w-full bg-blue-700 text-white uppercase font-bold px-3 py-2 rounded-md
                            shadow-md hover:bg-blue-800 transition duration-300'
                            >
                                {cliente?.nombre
                                    ? 'Editar Cliente'
                                    : 'Agregar Cliente'}
                            </button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

// Default Props
Formulario.defaultProps = {
    // Toma un prop con un objeto vacío para crear nuevos clientes, y si estamos en edición tiene el objeto ya lleno
    cliente: {},
    cargando: false,
};

export default Formulario;
