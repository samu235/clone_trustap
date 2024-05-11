export default state => {
    switch (state) {
        case 1:
            return 'Esperando Usuarios'
        case 2:
            return 'Pendiente de pago'
        case 3:
            return 'Pendiente de Envio'
        case 4:
            return 'Enviado, Pendiente entrega'
        case 5:
            return 'Entregado'
        default:
            return 'Error';
    }
}