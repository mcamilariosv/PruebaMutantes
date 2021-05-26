/*En esta clase se encuentran agrupadas todas las funciones
que nos ayudaran a manipular un array. se pendo de tal manera
que independizara los metodos para que asi puedan ser usados
en diferentes partes el proyecto. por ejemplo; si necesito solo 
convertir un array de NxN a matriz llamaria al metodo que se encarga
de tal funcion. o si ya tengo una matriz pero necesito recorerla en
direccion vertical, llamaria al metodo que se encarga de tal funcion.
y asi sucesivamente con los demas metodos. */

// Este metodo se encarga de generar una matriz basandose en el array enviado como parametro
module.exports.crearMatriz = async(_array) => {
    let _matriz = []; // declarar matriz
    // se recorre el array enviado
    _array.forEach((item) => {
        let _vecttorTemporal = []; // se crea un vector temporal donde se almacena cada item del array recorrido
        for (let i = 0; i <= _array.length - 1; i++) {
            _vecttorTemporal.push(item[i].toUpperCase()); // se agrega el item en la pusicion I al vector temporal.
        }
        _matriz.push(_vecttorTemporal); // se agrega el vector temporal a la matriz en N
    });
    return _matriz; // retornar matriz completa
}

//Validar que la matriz si sea NxN , es decir cuatratica
module.exports.validezCuadratica = async(_array) => {
    // el parametro que se debe enviar, debe ser el array sin manipular, es decir sin estar convertido en una matriz
    // buscamos que cada item del array contenga la misma dimensiones
    const _validarMatriz = _array.find(item => item.length !== _array.length); // preguntamos si hay algun item que sea diferente a la longitud del array, de ser asi, esto se conviert4e en una verdad (true)
    if (_validarMatriz) // si es true, quiere decir que no es cuadratica
        return false;
    else
        return true;
}

// Validar una secuencia de 4 posiciones que conincidan Verticalmente dentro de la matriz
module.exports.validarCadenaVertical = async(_matriz) => {
    let _contador = 0; // contador que se encargara de sumar uno cada vez que se encuentre una secuencia vertical.
    //Recorrer matriz
    for (let i = 0; i < _matriz.length; i++) {
        for (let j = 0; j < _matriz.length; j++) {
            if (_matriz.length - i >= 4) {
                if ((_matriz[i][j] == _matriz[i + 1][j]) && (_matriz[i][j] == _matriz[i + 2][j]) &&
                    (_matriz[i][j] == _matriz[i + 3][j])) {
                    _contador++;
                }
            }
        }

    }
    return _contador;
}

// Validar una secuencia de 4 posiciones que conincidan horizontal dentro de la matriz
module.exports.validarCadenaHorizontal = async(_matriz) => {
    let _contador = 0; // contador que se encargara de sumar uno cada vez que se encuentre una secuencia horizontal
    //Recorrer matriz
    for (let i = 0; i < _matriz.length; i++) {
        for (let j = 0; j < _matriz.length; j++) {
            if ((_matriz[i][j] == _matriz[i][j + 1]) && (_matriz[i][j] == _matriz[i][j + 2]) &&
                (_matriz[i][j] == _matriz[i][j + 3])) {
                _contador++;
            }
        }
    }
    return _contador;
}

// Validar diagonales de izquierda  a derecha
module.exports.validarDigonalIzquierda = async(_array) => {
    let filas = 0;
    let columnas = 0;
    let _contador = 0;
    for (let i = _array.length - 1; i >= 0; i--) {
        if (i == 0) {
            //Buscar diagonales partiendo desde 0 hasta N
            for (let j = 0; j < _array.length; j++) {
                filas = j;
                columnas = i;
                let _guardarSecuencia = await encontrarDiagonalIzquierda(_array, filas, columnas, true);
                _contador = _contador + _guardarSecuencia;
            }
        } else {
            //Buscar diagonales partiendo desde N hasta 0
            columnas = i;
            let _guardarSecuenciaColumnas = await encontrarDiagonalIzquierda(_array, filas, columnas, false);
            _contador = _contador + _guardarSecuenciaColumnas;
        }
    }
    return _contador;
}

// Validar diagonales de derecha a izquierda
module.exports.validarDigonalDerecha = async(_array) => {
    let filas = 0;
    let columnas = 0;
    let _contador = 0;
    for (let j = 0; j <= _array.length - 1; j++) {
        if (j == _array.length - 1) {
            //Buscar diagonales partiendo desde N hasta N
            for (let i = 0; i <= _array.length - 1; i++) {
                columnas = i;
                filas = j;
                let _guardarSecuencia = await encontrarDiagonalDerecha(_array, filas, columnas, false);
                _contador = _contador + _guardarSecuencia;
            }
        } else {
            //Buscar diagonales partiendo desde 0 hasta N
            filas = j;
            let _guardarSecuenciaFilas = await encontrarDiagonalDerecha(_array, filas, columnas, true);
            _contador = _contador + _guardarSecuenciaFilas;
        }
    }
    return _contador;
}

//Encontrar diagonales de derecha a izquierda
const encontrarDiagonalDerecha = async(_array, filas, columnas, iniciarFilas) => {
    let _contador = 0; // contador que almacenara las secuencias hayadas en las diagonales encontradas dentro de la matriz de derecha a izquierda
    let _limiteContadorMatriz = 0; // se destina para determinar el limite del contador de la matriz y poder validar que en este caso no se mayor a 4.
    while ((columnas <= _array.length - 1) && filas >= 0) {
        //Establecer inicio de contador de matriz para evitar errores de indexacion.
        if (!iniciarFilas) {
            _limiteContadorMatriz = ((_array.length - columnas) - 1);
        } else {
            _limiteContadorMatriz = filas;
        }
        if (_limiteContadorMatriz >= 3) {
            //Validar diagonales
            if ((_array[columnas][filas] == _array[columnas + 1][filas - 1]) &&
                (_array[columnas][filas] == _array[columnas + 2][filas - 2]) &&
                (_array[columnas][filas] == _array[columnas + 3][filas - 3])) {
                _contador++;
            }
        }
        columnas++;
        filas--;
    }
    return _contador;
};

//Encontrar diagonales de izquierda a derecha
const encontrarDiagonalIzquierda = async(_array, filas, columnas, iniciarFilas) => {
    let _contador = 0; // contador que almacenara las secuencias hayadas en las diagonales encontradas dentro de la matriz de izquierda a derecha
    let _limiteContadorMatriz = 0; // se destina para determinar el limite del contador de la matriz y poder validar que en este caso no se mayor a 4.
    while ((columnas <= _array.length - 1) && (filas <= _array.length - 1)) {
        //Establecer inicio de contador de matriz para evitar errores de indexacion.
        if (iniciarFilas) {
            _limiteContadorMatriz = _array.length - filas;
        } else {
            _limiteContadorMatriz = _array.length - columnas;
        }
        if (_limiteContadorMatriz >= 4) {
            //Validar diagonales
            if ((_array[columnas][filas] == _array[columnas + 1][filas + 1]) &&
                (_array[columnas][filas] == _array[columnas + 2][filas + 2]) &&
                (_array[columnas][filas] == _array[columnas + 3][filas + 3])) {
                _contador++;
            }
        }
        filas++;
        columnas++;
    }
    return _contador;
};