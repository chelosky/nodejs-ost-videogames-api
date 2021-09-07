import { config } from 'dotenv';
config();

const {DATA_BASE_NAME_PROD, DATA_BASE_NAME_TEST, DATA_BASE_NAME_DEV, NODE_ENV} = process.env;

const DATA_BASE = NODE_ENV === 'test' 
    ? DATA_BASE_NAME_TEST
    : DATA_BASE_NAME_DEV
;

/** PARA LA VARIABLES DE ENTORNO */
export default {
    mongodbURL: `${process.env.MONGODB_URI}/${DATA_BASE}` || `mongodb://localhost/${DATA_BASE}`,
    adminTOKEN: process.env.ADMIN_TOKEN || 'lifebeforedeathstrengthbeforeweaknessjourneybeforedestination'
}