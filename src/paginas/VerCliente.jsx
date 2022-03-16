import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
    /* extraendo los parametros de la url */
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `${import.meta.env.VITE_SOME_URL}/${id}`;

                const respuesta = await fetch(url);
                const resultado = await respuesta.json();

                setCliente(resultado);
            } catch (error) {
                console.error(error);
            }

            setCargando(!cargando);

        };

        obtenerClienteAPI();
    }, []);

    return (
        <div>
            {cargando ? (
                <Spinner />
            ) : Object.keys(cliente).length === 0 ? (
                <p>No hay registros</p>
            ) : (
                <>
                    <h1 className="font-black text-4xl text-blue-900">
                        Ver Cliente: {cliente.nombre}
                    </h1>
                    <p className="mt-3">Informacion del cliente</p>

                    {cliente.nombre && (
                        <p className="text-4xl text-gray-700 mt-10">
                            <span className="uppercase font-bold text-gray-800">
                                Cliente:{" "}
                            </span>
                            {cliente.nombre}
                        </p>
                    )}

                    {cliente.empresa && (
                        <p className="text-2xl text-gray-700 mt-4">
                            <span className="uppercase font-bold text-gray-800">
                                Empresa:{" "}
                            </span>
                            {cliente.empresa}
                        </p>
                    )}

                    {cliente.email && (
                        <p className="text-2xl text-gray-700 mt-4">
                            <span className="uppercase font-bold text-gray-800">
                                E-mail:{" "}
                            </span>
                            {cliente.email}
                        </p>
                    )}

                    {cliente.telefono && (
                        <p className="text-2xl text-gray-700 mt-4">
                            <span className="uppercase font-bold text-gray-800">
                                Telefono:{" "}
                            </span>
                            {cliente.telefono}
                        </p>
                    )}

                    {cliente.notas && (
                        <p className="text-2xl text-gray-700 mt-4">
                            <span className="uppercase font-bold text-gray-800">
                                Notas:{" "}
                            </span>
                            {cliente.notas}
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default VerCliente;
