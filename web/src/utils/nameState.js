export default state =>{
    switch (state) {
        case 1:
            return 'Esperando Usuarios'
        case 2:
            return 'Pendiente de pago'
        default:
            return 'Error';
    }
}