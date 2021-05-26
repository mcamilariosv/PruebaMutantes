const _auxiliar = require("../auxiliares/constantes"); // Respuestas constantes usadas para no repetir codigo "quemado" dentro del codigo fuente
const _manipulacionArray = require("../auxiliares/manipulacionarray"); // Contiene los metodos que se encargan de manipular  y procesar lols array.
const _accesoBaseDeDatos = require("./statsMutante");


module.exports.validarAdnMutante = async(cadena_adn) => {
    try {
        let _matriz = null; //dispuesta para almacenar el resultado del array convertido a una matriz cuadratica.
        let _secuenciasHorizontales = 0; // secuendias de ADN encontradas horizontalmente
        let _secuenciasVerticales = 0; // secuendias de ADN encontradas vertical
        let _secuenciasdiagonalIzquierda = 0; // secuendias de ADN encontradas en las diagonales iniciando de la izquierda hasta derecha
        let _secuenciasdiagonalDerecha = 0; // secuendias de ADN encontradas en las diagonales iniciando de la derecha hasta izquierda

        _matriz = await _manipulacionArray.crearMatriz(cadena_adn.dna); // convertir cadena a matriz cuadtratica
        if ((_matriz.length != 0) && (_matriz != null)) {
            _secuenciasHorizontales = await _manipulacionArray.validarCadenaHorizontal(_matriz);
            _secuenciasVerticales = await _manipulacionArray.validarCadenaVertical(_matriz);
            _secuenciasdiagonalIzquierda = await _manipulacionArray.validarDigonalIzquierda(_matriz);
            _secuenciasdiagonalDerecha = await _manipulacionArray.validarDigonalDerecha(_matriz);
        }
        //Sumar resultados contadores secuencias.
        let validarAdn = _secuenciasHorizontales + _secuenciasVerticales + _secuenciasdiagonalIzquierda + _secuenciasdiagonalDerecha;

        //Si el resultado de la suma de los contadores de secuencias es mayor a 1 quiere decir que es un mutante
        if (validarAdn > 1) {
            //Se guarda trazabilidad de la cadena de adn enviada y si es mutante.
            await _accesoBaseDeDatos.crearRegistro({ cadena_adn: JSON.stringify(cadena_adn.dna), esMutante: true });
            return true;

        } else {
            //Se guarda trazabilidad de la cadena de adn enviada y si NO es mutante.
            await _accesoBaseDeDatos.crearRegistro({ cadena_adn: JSON.stringify(cadena_adn.dna), esMutante: false });
            return false;
        }

    } catch (error) {
        /* Aqui se podria usar un logger o algun servicio que ayude a guardar la trazabilidad de errores 
        ejemplo: 'error mutante-controlador , metodo validarAdnMutante {$error}'*/
        return _auxiliar.errorInternoDelServidor;
    }
}