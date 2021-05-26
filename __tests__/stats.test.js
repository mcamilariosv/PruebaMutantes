const expect = require('expect');
const { crearRegistro, obtenerEstadisticasGenerales } = require('../controladores/statsMutante');


describe("Pruebas unitarias estadisticas", () => {

    test("01- Registrar una estdistica.", async(done) => {
        //esta siempre inserta los mismos datos, lo que cambia es el campo de si es mutante o no el cual tiene un valor booleano.
        const _respuestaRegistro = await crearRegistro({ cadena_adn: JSON.stringify(["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]), esMutante: true });
        expect(_respuestaRegistro.esMutante).toBe(true);
        done();
    });

    test("02- Obtener resumen de todas las estadisticas.", async(done) => {
        const _respuestaEstadisticas = await obtenerEstadisticasGenerales();
        expect(_respuestaEstadisticas.count_mutant_dna >= 1).toBeTruthy();
        done();
    });
});