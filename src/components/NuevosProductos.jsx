import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//actions de redux
import {crearNuevosProductos} from '../actions/productoAction'

const NuevosProductos = () => {
    let navigate = useNavigate();
    //state del componente
    const [ nombre, guardarNombre ] = useState('');
    const [ precio, guardarPrecio ] = useState(0);

    //utilizar useDispach y te crea una funcion
    const dispatch = useDispatch();

    //acceder al state del store
    const cargando = useSelector( state => state.productos.loading);
    const error = useSelector( state => state.productos.error);
    
    //manda a llamar el action de productoAction
    const agregarProducto = producto => dispatch( crearNuevosProductos(producto) )
    //cuando haga submit
    const submitNuevosProductos = e => {
        e.preventDefault();

        //validar 
        if(nombre.trim() === '' || precio <= 0) {
            return;
        }
        //que no haya errores

        //crear producto
        agregarProducto({
            nombre,
            precio
        });
        
        //redireccionar
        navigate('/')
    }

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className='text-center mb-4 font-weight-bold'>
                                Agregar Nuevo Producto
                            </h2>
                            <form 
                                onSubmit={submitNuevosProductos}
                            >
                                <div className="form-group">
                                    <label>Nombre Producto</label>
                                    <input type="text"
                                        className='form-control'
                                        placeholder='Nombre Producto'
                                        name='nombre'
                                        value={nombre}
                                        onChange={ e => guardarNombre(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio Producto</label>
                                    <input type="number"
                                        className='form-control'
                                        placeholder='Precio Producto'
                                        name='precio'
                                        value={precio}
                                        onChange={ e => guardarPrecio(Number(e.target.value))}
                                    />
                                </div>
                                <button 
                                    type='submit'
                                    className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                                >
                                    Agregar
                                </button>
                            </form>
                            { cargando ? <p>Cargando...</p> : null }
                            { error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error</p> : null }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NuevosProductos;