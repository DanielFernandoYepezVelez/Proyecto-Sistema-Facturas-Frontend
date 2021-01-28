/* Error En El ID Enviado Desde El Frontend Y Pasando El Controlador
   Completamente, Ejcutando La Query E Interactuando Con La Base De Datos */
export interface ResponseServerErrorID {
    error: { mensaje: string };
}

/* Error De Un Dato Faltante Desde El Frontend Y Pasando El Controlador
   Completamente, Ejecutando La Query E Interactuando Con La Base De Datos */
export interface ResponseServerError {
    error: { mensaje: string; error: string };
}

/* Error Para Un Conjunto De Campos Faltantes Desde El Frontend Que Se Agregan
   En El Body Para Ser Validados Al Inicio Del Controlado Y Saber Si Es Posible
   Pasar EL Controlador Completamente E Interactuar Con La Base De Datos */
export interface ResponseServerErrors {
    errors: string[];
}