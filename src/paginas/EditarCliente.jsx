import {useState , useEffect} from 'react';
import Formulario from "../components/Formulario";
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';

const EditarCliente = () => {

    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;

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
        <>
            {cargando ? <Spinner /> : (
                <>
                    <h1 className="font-black text-4xl text-blue-900">Editar Cliente : {cliente.nombre}</h1>
                    <p className="mt-3">Edita los datos de tus clientes aqui</p>

                    {cliente.nombre ? (   
                        <Formulario 
                            cliente = {cliente}
                        />
                    ) : (
                        <p>Cliente ID no valido</p>
                    )}

                </>
            )}
        </>


    )
}

export default EditarCliente