import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import apiV1 from './api/v1/index';
import apiV2 from './api/v2/index';

const app = express();

//#region general config
//settings
app.set('port', process.env.PORT || 3000);

//public folder
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));
//#endregion

//middlewares
//#region middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//#endregion

// routes
//#region Routes Api
app.get('/api/', (req, res) => {
    res.json({
        v1: 'api/v1',
        v2: 'api/v2'
    })
});

app.use('/api/v1', apiV1);
app.use('/api/v2', apiV2);
//#endregion

export default app;