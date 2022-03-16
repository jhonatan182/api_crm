import React from 'react'
import { Formik, Form, Field , ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import Alerta from './Alerta';

const Formulario = ({cliente}) => {
    
    const nativate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        /* aqui se colocan los datos o campos del formulario */
        nombre: Yup.string()
                    .min(3 , 'El nombre es muy corto')
                    .max(45 , 'El nombre es demasiado largo')
                    .required('El nombre es obligatorio'),
        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),
        email :  Yup.string()
                    .required('El correo es obligatorio')
                    .email('Email no valido'),
        telefono: Yup.number()
                    .integer('Telefono invalido')
                    .positive('Telefono invalido')
                    .typeError('Telefono invalido')
    })

    const handleSubmit = async (values, {resetForm}) => {

        try {
            let respuesta;

            if(cliente.id) {
                const url = `${import.meta.env.VITE_SOME_KEY}/${cliente.id}`;

                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                })


            } else {

                const url = import.meta.env.VITE_SOME_KEY;
                respuesta = await fetch(url , {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                });
            }


            await respuesta.json();

            resetForm();
            nativate('/clientes');

        } catch (error) {
            console.log(error);
        }

    }

    return (

        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 m-auto">
            <h1 className="text-gray-500 font-bold text-center text-xl uppercase"> { cliente.id ? 'Editar Cliente' : 'Agregar Cliente'} </h1>

            {/* aqui se inicilizan las varibles de los campos */}
            <Formik
                

                initialValues={{
                    nombre : cliente.nombre ? cliente.nombre : '',
                    empresa: cliente.empresa ? cliente.empresa : '',
                    email: cliente?.email ?? '',
                    telefono: cliente?.telefono ?? '',
                    notas: cliente?.notas ?? '',
                }}

                onSubmit ={ handleSubmit }
                /* permite inizializar con datos que si viene para editar */
                enableReinitialize = {true}
                /* habilitar las validaciones del esquema */
                validationSchema ={nuevoClienteSchema}
            >
                { ({errors , touched}) => {
                    //console.log(errors)
                    return (

                    <Form className="mt-10">

                        <div className="mb-4">
                            <label 
                                htmlFor="nombre"
                                className="text-gray-800"
                            >Nombre: </label>
                            <Field
                                type ="text" 
                                className="mt-2 block w-full p-3 bg-gray-100"
                                placeholder = "Nombre del cliente"
                                name ="nombre"
                            />

                            {errors.nombre && touched.nombre ? (
                                <Alerta> {errors.nombre} </Alerta>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label 
                                htmlFor="empresa"
                                className="text-gray-800"
                            >Empresa: </label>
                            <Field
                                type ="text" 
                                className="mt-2 block w-full p-3 bg-gray-100"
                                placeholder = "Empresa del cliente"
                                name="empresa"
                            />
                            {errors.empresa && touched.empresa ? (
                                <Alerta> {errors.empresa} </Alerta>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label 
                                htmlFor="email"
                                className="text-gray-800"
                            >E-mail: </label>
                            <Field
                                type ="email" 
                                className="mt-2 block w-full p-3 bg-gray-100"
                                placeholder = "Email del cliente"
                                name="email"
                            />

                            {errors.email && touched.email ? (
                                <Alerta> {errors.email} </Alerta>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label 
                                htmlFor="telefono"
                                className="text-gray-800"
                            >Telefono: </label>
                            <Field
                                type ="tel" 
                                className="mt-2 block w-full p-3 bg-gray-100"
                                placeholder = "Telefono del cliente"
                                name="telefono"
                            />

                            {errors.telefono && touched.telefono ? (
                                <Alerta> {errors.telefono} </Alerta>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label 
                                htmlFor="notas"
                                className="text-gray-800"
                            >Notas: </label>
                            <Field
                                as="textarea"
                                type ="text" 
                                className="mt-2 block w-full p-3 bg-gray-100 h-40"
                                placeholder = "Notas del cliente"
                                name="notas"
                            />
                        </div>

                        <input 
                            type="submit" 
                            value={ cliente.id ? 'Editar Cliente' : 'Agregar Cliente'}
                            className="mt-5 w-full bg-blue-800 p-3 text-white font-bold text-lg uppercase"
                        />
                    </Form>
                )}}
            </Formik>
        </div>
    )
}

/* propos por defectos */
Formulario.defaultProps = {
    cliente: {}
}

export default Formulario;