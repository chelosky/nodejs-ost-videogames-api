import mongosee from 'mongoose';
import config from './config';
/**
 * PARA LA CONFIGURACIÓN DE LA DB
 */
/**Funcion inmediatemente invocada */
(async () => {
    try {
        // Obtenemos la conexion de la bd
        const db = await mongosee.connect(config.mongodbURL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
        console.log('Conexión db: ', db.connection.name);
    } catch (error) {
        console.error(error);
    }
})();