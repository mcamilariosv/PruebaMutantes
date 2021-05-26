const _statsContrlador = require("../controladores/statsMutante"); // controlador donde se procesa solicitud de gestion para stats
const _auxiliar = require("../auxiliares/constantes"); //  constantes usadas para no repetir codigo "quemado" dentro del codigo fuente.

module.exports.statsMutante = async(event) => {
    try {
        let _respuesta = null;
        switch (event.httpMethod) {
            // Se evalua el metodo POST 
            case "GET":
                _respuesta = await _statsContrlador.obtenerEstadisticasGenerales();
                return {
                    statusCode: _auxiliar.ok,
                    body: JSON.stringify(_respuesta)
                }
        }
    } catch (error) {
        //Aqui se podria usar un logger o algun servicio que ayude a guardar la trazabilidad de errores
        return {
            statusCode: _auxiliar.Unprocessable,
            body: _auxiliar.mensajeUnprocessable
        }
    }
}