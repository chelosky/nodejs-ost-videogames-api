import express from 'express';
import VideogamesRoutes from './routes/videogame.routes';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.get('/', (req, res) => {
    res.json({
        message: 'GET DE TESTING'
    })
});

app.use('/api/videogames', VideogamesRoutes);


export default app;