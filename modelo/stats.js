const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.statsSchema = new mongoose.Schema({
    cadena_adn: {
        type: String
    },
    esMutante: {
        type: Boolean
    }
});

module.exports.StatsModel = (connection) => {
    return connection.model("stats", this.statsSchema);
};