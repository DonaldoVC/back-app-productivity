import mongoose = require("mongoose");

class Connection {

    dbURI = process.env.DB_URI;

    connect () {
        return new Promise(async (resolve, reject) => {
            await mongoose.connect(this.dbURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        });
    }
}

mongoose.connection.on('connected', function () {
    console.log('Mongoose conexión abierta: ' + process.env.DB_URI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Desconectado de la base de datos');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Se cierra la conexión');
        process.exit(0);
    });
});


export default new Connection().connect();
