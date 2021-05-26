/*en este archivo se encuentra el metodo que valida que el
arrar enviado contenga las letras validas mencionadas en el enunciado
del examen: (A,T,C,G), */

const _auxiliar = require("./constantes"); // Respuestas constantes usadas para no repetir codigo "quemado" dentro del codigo fuente


/*Metodo que se encarga de validar si un array cumple con el contenido de letras 
o caracteres configurados en el archivo auxiliar de respuestas */
module.exports.validarLetrasArray = async(_string) => {
    //Esta lista contiene los valores de letras permitidos que puede contener el array.
    let _listaLetras = _auxiliar.letras;
    let _permitido = true;
    // se recorre el array enviado
    for (let i = 0; i < _string.length; i++) {
        let _letras = _string[i];
        for (let j = 0; j < _letras.length; j++) {
            if ((_letras[j].toUpperCase() != _listaLetras[0]) && (_letras[j].toUpperCase() != _listaLetras[1]) &&
                (_letras[j].toUpperCase() != _listaLetras[2]) && (_letras[j].toUpperCase() != _listaLetras[3])) {
                return _auxiliar.notAcceptable;

            }
        }
    }
    if (_permitido)
        return _auxiliar.ok;
    else
        return _auxiliar.notAcceptable;
}