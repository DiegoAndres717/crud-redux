import clienteAxios from '../config/axios'
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types'
import Swal from 'sweetalert2'
import { type } from '@testing-library/user-event/dist/type'

//crear nuevos productos
export function crearNuevosProductos(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() )

        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto);

            //si todo sale bien actualizar el state
            dispatch( agregarProductoExito(producto) )

            //Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            //si hay un error, cambiar el state
            dispatch( agregarProductoError(true));

            //Alerta error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//si se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})
//si hay un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

//descarga los productos de la db
export function getProductos() {
    return async (dispatch) => {
        dispatch( descargarProductos() )

        try {
            const respuesta = await clienteAxios.get('/productos')
            //console.log(respuesta.data)
            dispatch(descargarProductosExitosa(respuesta.data))
        } catch (error) {
            dispatch( descargarProductosError(true))
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargarProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})
//selecciona y elimina el productos de la db
export function deleteProducto(id) {
    return async (dispatch) => {
        dispatch( obtenerProductoEliminar(id));

        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito())

            //si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto se eliminó correctamente.',
                'success'
              )
        } catch (error) {
            console.log(error);
            dispatch( eliminarProductoError())
            
        }
    }
}
const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})
const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO,
    
})
const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: true
    
})

//selecciona y edita el producto de la db
export function obtenerProducto(producto) {
    return async (dispatch) => {
        dispatch( obtenerProductoEditar(producto));
    }
}
const obtenerProductoEditar = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//EDITAR EN LA apI
export function editarProducto(producto) {
    return async (dispatch) => {
        dispatch( editarProductoEditar(producto));

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
        } catch (error) {
            
        }
    }
}
const editarProductoEditar = producto => ({
    type: COMENZAR_EDICION,
    payload: producto
})

