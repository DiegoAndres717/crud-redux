import React, { useEffect } from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { getProductos } from '../actions/productoAction';
import Producto from './Producto';

const Productos = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      //consultar la API
      const cargarProductos = () => dispatch( getProductos() );
      cargarProductos();
    }, [])
    
    //obtener el state
    const productos = useSelector( state => state.productos.productos );
    const error = useSelector( state => state.productos.error );
    const cargando = useSelector( state => state.productos.loading );
    

    return (
        <>
            <h2 className='text-center my-5'>Listado de Productos</h2>
            { error ? <p className='font-weight-bold alert alert-danger text-center mt-4'>Hubo un error</p> : null}
            { cargando ? <p className='text-center'>Cargando...</p> : null}
            <table className="table table-striped">
                <thead className='bg-primary table-dark'>
                    <tr>
                        <th scope='col'>Nombre</th>
                        <th scope='col'>Precio</th>
                        <th scope='col'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { productos ?  (
                        productos.map( producto => (
                            <Producto 
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    ) : "No hay productos"}
                </tbody>
            </table>
        </>
    );
};

export default Productos;