export const formatearCantidad = cantidad => {
    return Number(cantidad).toLocaleString('es-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export const formatearFecha = fecha => {
    return new Date(fecha).toLocaleString('es-MX', {
        dateStyle: "long"
    })
}

