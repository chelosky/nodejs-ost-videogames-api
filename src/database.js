import mongoose from 'mongoose';
import config from './config';
/**
 * PARA LA CONFIGURACIÓN DE LA DB
 */
mongoose.connect(config.mongodbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err, res) => {
        if (err) console.log('Error al conectar a la base de datos');
        else console.log('Conexión db: ', res.connection.name);
});