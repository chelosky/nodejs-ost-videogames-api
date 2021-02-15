import express from 'express';
import VideogamesRoutes from './routes/videogame.routes';
import SoundtracksRoutes from './routes/soundtrack.routes';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//public folder
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/api/', (req, res) => {
    res.json({
        message: 'GET DE TESTING'
    })
});

app.use('/api/videogames', VideogamesRoutes);
app.use('/api/soundtracks', SoundtracksRoutes);

export default app;