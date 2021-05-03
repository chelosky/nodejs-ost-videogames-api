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
        videogames: 'api/videogame',
        soundtracks: 'api/soundtrack'
    })
});

app.use('/api/videogame', VideogamesRoutes);
app.use('/api/soundtrack', SoundtracksRoutes);

export default app;