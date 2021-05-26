const { conexion } = require("../config/mongodb"); // Conexion con la base de datos
const { StatsModel } = require("../modelo/stats"); // Modelo de estadisticas
const _auxiliar = require("../auxiliares/constantes"); // Respuestas constantes usadas para no repetir codigo "quemado" dentro del codigo fuente

//Metodo que se encarrga de registar en la base de datos el registro del log de la cadena de adn para las estadisticas
module.exports.crearRegistro = async(datos) => {
    const _db = await conexion.db();
    const _statsModelo = await StatsModel(_db);
    let _registro = null;
    try {
        _registro = await _statsModelo.create(datos);
    } catch (error) {
        /* Aqui se podria usar un logger o algun servicio que ayude a guardar la trazabilidad de errores 
           ejemplo: 'error mutante-controlador , metodo validarAdnMutante {$error}'*/
        return _auxiliar.errorInternoDelServidor;
    }
    return _registro;
};

//Metodo encargado de realizar las estadisticas.
module.exports.obtenerEstadisticasGenerales = async() => {
    const _db = await conexion.db();
    const _statsModelo = await StatsModel(_db);
    let _contadorMutantes = null;
    let _contadorNoMutantes = null;
    let _ratio = null;
    let _respuesta = {};
    try {
        _contadorMutantes = await _statsModelo.countDocuments({ esMutante: true }); // contar cuantas cadenas de adn ingresadas han sido cadenas de ADN de mutantes.
        _contadorNoMutantes = await _statsModelo.countDocuments({ esMutante: false }); // contar cuantas cadenas de adn ingresadas han sido cadenas de ADN de humanos.
        _ratio = (_contadorMutantes / _contadorNoMutantes).toFixed(1); // proporcion de los valores anteriormente encontrados
        //Validar que el ratio de una valor "real" para evitar mostrar informacion basura al usuario del api.
        if ((isNaN(_ratio)) || (!isFinite(_ratio)))
            _ratio = 0;
        //Respuesta que se envia al handler
        _respuesta = {
            count_mutant_dna: _contadorMutantes,
            count_human_dna: _contadorNoMutantes,
            ratio: _ratio
        }
    } catch (error) {
        /* Aqui se podria usar un logger o algun servicio que ayude a guardar la trazabilidad de errores 
              ejemplo: 'error mutante-controlador , metodo validarAdnMutante {$error}'*/
        return _auxiliar.errorInternoDelServidor;
    }
    return _respuesta;
};