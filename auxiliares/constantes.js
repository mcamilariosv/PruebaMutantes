module.exports = {
    codigo: "codigo",
    mensaje: "mensaje",
    ok: 200,
    mensajeOk: "ADN valido para un mutante.",
    badRequest: 400,
    notAcceptable: 406,
    mensajeBadRequest: "Debes proporcionar una cadena de ADN valida.",
    forbidden: 403,
    mensajeForbidden: "ADN NO valido para un mutante.",
    Unprocessable: 422,
    mensajeUnprocessable: "La petición estaba bien formada pero no se pudo seguir debido a errores de semántica.",
    errorInternoDelServidor: 500,
    letras: ["A", "T", "C", "G"],
    mensajeLetrasNoAceptables: "El array NO contiene los valores permitidos para la cadena de ADN."

}