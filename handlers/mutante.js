const _mutantecontrolador = require("../controladores/mutante"); // controlador donde se procesa la cadena de ADN ingresada para saber si es mutante o no.
const _auxiliar = require("../auxiliares/constantes"); //  constantes usadas para no repetir codigo "quemado" dentro del codigo fuente.
const _validarLetras = require("../auxiliares/validarletras"); // Contiene el metodo para validar que el array contenga las letras permitidas.
const _manipulacionArray = require("../auxiliares/manipulacionarray"); // Contiene los metodos que se encargan de manipular  y procesar lols array.

module.exports.mutante = async(event) => {
    try {
        let _validarLetrasPermitidas = null;
        let _validarLongitud = null;
        let _cadena = null;
        let _respuesta = null;
        switch (event.httpMethod) {
            // Se evalua el metodo POST 
            case "POST":
                //Se evalua que exista un body en el requqest
                if (event.body) {
                    _cadena = JSON.parse(event.body); // se convierte el request en JSON
                    //Se envia la cadena de ADN enviada en el request, para que se valide si cumple las condiciones de una mat5riz NxN o cuadratica
                    _validarLongitud = await _manipulacionArray.validezCuadratica(_cadena.dna);
                    if (!_validarLongitud) {
                        return {
                            statusCode: _auxiliar.badRequest,
                            body: _auxiliar.mensajeBadRequest
                        }
                    }
                    _validarLetrasPermitidas = await _validarLetras.validarLetrasArray(_cadena.dna); // se envia la cadena de ADN ingresada al metodo que valida si contiene las letras o los caracteres permitidos.
                    //Si no contiene valores permitidos dentro de la secuencia de ADN devuelve un mensaje con esta informacion.
                    if (_validarLetrasPermitidas === 406) {
                        return {
                            statusCode: _auxiliar.notAcceptable,
                            body: _auxiliar.mensajeLetrasNoAceptables
                        }
                    }
                    //Se envia cadena de adn ingresado al controlador para que este lo procese y determine si la cadena cumple o no con las caracterizticas de una cadena de adn de un mutante
                    _respuesta = await _mutantecontrolador.validarAdnMutante(_cadena);
                    if (_respuesta) {
                        return {
                            statusCode: _auxiliar.ok,
                            body: _auxiliar.mensajeOk,
                        }
                    } else {
                        return {
                            statusCode: _auxiliar.forbidden,
                            body: _auxiliar.mensajeForbidden,
                        }
                    }

                } else {
                    //Se retorna un codigo de estado 400 ya que es necesario que ingrese la cadena de ADN.
                    return {
                        statusCode: _auxiliar.badRequest,
                        body: _auxiliar.mensajeBadRequest
                    }
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