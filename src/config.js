import { config } from 'dotenv';
config();

/** PARA LA VARIABLES DE ENTORNO */
export default {
    mongodbURL: process.env.MONGODB_URI || 'mongodb://localhost/ostvideogamesapi',
}