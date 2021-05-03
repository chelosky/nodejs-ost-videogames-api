import { Router } from 'express';
import { verifyAdminToken } from '../middlewares/admin-token';
import * as soundtrackController from '../controllers/soundtrack.controller';

const router = Router();

/**************************
    PUBLIC ENDPOINTS -> api/soundtracks
***************************/

router.get('/', soundtrackController.findAllSoundtracks);

router.get('/:id', soundtrackController.findOneSoundtrack);

router.get('/videogame/:id', soundtrackController.findAllSoundtracksOfAVideogame);

router.get('/videogame/name/:name', soundtrackController.findAllSoundtracksOfAVideogameName);

/**************************
    ADMIN ENDPOINTS
***************************/

router.post('/', verifyAdminToken,  soundtrackController.createSoundtrack);

router.put('/:id', verifyAdminToken, soundtrackController.updateSoundtrack);

router.delete('/:id', verifyAdminToken, soundtrackController.deleteSoundtrack);

router.delete('/clean/db', verifyAdminToken, soundtrackController.deleteAllSoundtrack);

export default router;