import supertest from 'supertest';
import { app } from '../../index';
import config from '../../config';
import mongoose from 'mongoose';
import { server } from '../../index';

const api = supertest(app);

const BEARER_TOKEN_TEST = 'Bearer ' + config.adminTOKEN;

const REGEX_APPLICATION_JSON = /application\/json/;

const closeOpenHandles = async() => {
    await server.close();
    await mongoose.connection.close();
};

module.exports = {
    api,
    BEARER_TOKEN_TEST,
    closeOpenHandles,
    REGEX_APPLICATION_JSON
}