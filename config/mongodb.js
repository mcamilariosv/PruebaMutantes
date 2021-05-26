const mongoose = require("mongoose");

var conexion = {
    _conn: null,
    db: async function(environment) {
        if (!this._conn) {
            try {
                this._conn = await mongoose.createConnection(
                    `mongodb+srv://admin:admin@pruebamutantes.th4p6.mongodb.net/pruebamutantes`, {
                        poolSize: 1,
                        useFindAndModify: false,
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    }
                );
            } catch (error) {
                console.error(error);
            }
        }
        return this._conn;
    },
};


module.exports = { conexion };