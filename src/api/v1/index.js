import { Router } from 'express';
import VideogamesRoutes from '../../routes/v1/videogame.routes';
import SoundtracksRoutes from '../../routes/v1/soundtrack.routes';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        description: 'V1 OST API',
        videogames: 'api/v1/videogame',
        soundtracks: 'api/v1/soundtrack'
    })
});

router.use('/videogame', VideogamesRoutes);
router.use('/soundtrack', SoundtracksRoutes);

export default router;