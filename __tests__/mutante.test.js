const expect = require('expect');
const { mutante } = require('../handlers/mutante');
var events = require('events');

describe("Pruebas unitarias mutantes", () => {

    test("01- La cadena de ADN ingresada es valida para un mutante.", async(done) => {
        events.httpMethod = "POST";
        events.body = JSON.stringify({
            "dna": [
                "ATGCGA",
                "CAGTGC",
                "TTATGT",
                "AGAAGG",
                "CCCCTA",
                "TCACTG"
            ]
        });

        const _respuestaAdnMutante = await mutante(events);
        expect(_respuestaAdnMutante.statusCode).toBe(200);
        done();
    });

    test("02- La cadena de ADN ingresada pertenece a un humano.", async(done) => {
        events.httpMethod = "POST";
        events.body = JSON.stringify({
            "dna": [
                "ATGCGA",
                "CCGTGC",
                "TTATGT",
                "AGAAGG",
                "CCCATA",
                "TCACTG"
            ]
        });

        const _respuestaAdnMutante = await mutante(events);
        expect(_respuestaAdnMutante.statusCode).toBe(403);
        done();
    });

    test("03- La cadena de ADN ingresada no cumple con las validaciones de conversion a una matriz cuadratica.", async(done) => {
        events.httpMethod = "POST";
        events.body = JSON.stringify({
            "dna": [
                "ATGCGA",
                "CCGTGC",
                "AGAAGG",
                "CCCATA",
                "TCACTG"
            ]
        });

        const _respuestaAdnMutante = await mutante(events);
        expect(_respuestaAdnMutante.statusCode).toBe(400);
        done();
    });

    test("04- La cadena de ADN ingresada no contiene las letras permitidas.", async(done) => {
        events.httpMethod = "POST";
        events.body = JSON.stringify({
            "dna": [
                "ATGCIA",
                "CAGJGC",
                "TMATLT",
                "ZGAAGG",
                "CCCYTA",
                "TCAWTG"
            ]
        });

        const _respuestaAdnMutante = await mutante(events);
        expect(_respuestaAdnMutante.statusCode).toBe(406);
        done();
    });
});