const { validarLetrasArray } = require('../auxiliares/validarletras');

describe("Pruebas clases auxiliares - Validar Letras", () => {

    test("01- Caso ingresando letras permitidas.", async(done) => {
        //Estamos validando que sea un caso exitoso.
        const _respuestaLetrasValidas = await validarLetrasArray(["ATGCGA", "CAGTAC", "TCAAGT", "ACAAGG", "CCCCTA", "TCACTG"]);
        expect(_respuestaLetrasValidas).toBe(200);
        done();
    });

    test("02- Caso ingresando NO letras permitidas.", async(done) => {
        //Estamos validando que NO sea un caso exitoso.
        const _respuestaNoLetrasValidas = await validarLetrasArray(["ATGCGM", "CAITAC", "TCLAGT", "ACWAGG", "CCCCTZ", "TCATYG"]);
        expect(_respuestaNoLetrasValidas).toBe(406);
        done();
    });
});