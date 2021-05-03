import { config } from 'dotenv';
config();

/** PARA LA VARIABLES DE ENTORNO */
export default {
    mongodbURL: `${process.env.MONGODB_URI}/${process.env.DATA_BASE_NAME}` || `mongodb://localhost/${process.env.DATA_BASE_NAME}`,
    adminTOKEN: process.env.ADMIN_TOKEN || 'lifebeforedeathstrengthbeforeweaknessjourneybeforedestination'
}