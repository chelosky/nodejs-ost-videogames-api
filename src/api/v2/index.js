import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        description: 'V2 OST API',
        videogames: 'api/v2/videogame (NOT IMPLEMENTED)',
        soundtracks: 'api/v2/soundtrack (NOT IMPLEMENTED)'
    })
});

export default router;