import { config } from 'dotenv';
config();

const {DATA_BASE_NAME_PROD, DATA_BASE_NAME_TEST, DATA_BASE_NAME_DEV, NODE_ENV} = process.env;

const DB_ENV = {
    test: DATA_BASE_NAME_TEST,
    production: DATA_BASE_NAME_PROD,
    development: DATA_BASE_NAME_DEV
}

const DATA_BASE = DB_ENV[NODE_ENV];

/** PARA LA VARIABLES DE ENTORNO */
export default {
    mongodbURL: `${process.env.MONGODB_URI}/${DATA_BASE}` || `mongodb://localhost/${DATA_BASE}`,
    adminTOKEN: process.env.ADMIN_TOKEN || 'lifebeforedeathstrengthbeforeweaknessjourneybeforedestination'
}