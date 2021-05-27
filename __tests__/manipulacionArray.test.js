const {
    crearMatriz,
    validezCuadratica,
    validarCadenaVertical,
    validarCadenaHorizontal,
    validarDigonalIzquierda,
    validarDigonalDerecha
} = require('../auxiliares/manipulacionarray');

const _array = ["ATGCGA", "CAGTAC", "TCAAGT", "ACAAGG", "CCCCTA", "TCACTG"]
let _matriz = null;

describe("Pruebas clases auxiliares - manipular array", () => {

    test("01- Validar que un array cumpla con las caracteristicas para convertirse en una matriz cuadratica.", async(done) => {
        //Estamos validando que sea un caso exitoso.
        const _respuestaVlidezCuadratica = await validezCuadratica(_array);
        expect(_respuestaVlidezCuadratica).toBe(true);
        done();
    });

    test("02- Validar que un array NO cumpla con las caracteristicas para convertirse en una matriz cuadratica.", async(done) => {
        //Estamos validando que NO sea un caso exitoso.
        const _respuestaNoVlidezCuadratica = await validezCuadratica(["ATGCG", "CAGTGC", "TTATGT", "CCCCTA", "TCACTG"]);
        expect(_respuestaNoVlidezCuadratica).toBe(false);
        done();
    });

    test("03- Crear una matriz cuadratica en base a un array dado.", async(done) => {
        _matriz = await crearMatriz(_array);
        expect(_matriz.length == 6).toBeTruthy();
        done();
    });


    test("04- Validar Secuencia verticalmente a partir  de una matriz dada.", async(done) => {
        const _respuestaVertical = await validarCadenaVertical(_matriz);
        expect(_respuestaVertical >= 1).toBeTruthy();
        done();
    });

    test("05- Validar Secuencia horizontlamente a partir  de una matriz dada.", async(done) => {
        const _respuestaHorizontal = await validarCadenaHorizontal(_matriz);
        expect(_respuestaHorizontal >= 1).toBeTruthy();
        done();
    });

    test("06- Validar diagonal izquierda a partir  de una matriz dada.", async(done) => {
        const _respuestaDiagonalIzq = await validarDigonalIzquierda(_matriz);
        expect(_respuestaDiagonalIzq >= 1).toBeTruthy();
        done();
    });

    test("06- Validar diagonal derecha a partir  de una matriz dada.", async(done) => {
        const _respuestaDiagonalDer = await validarDigonalDerecha(_matriz);
        expect(_respuestaDiagonalDer >= 1).toBeTruthy();
        done();
    });
});