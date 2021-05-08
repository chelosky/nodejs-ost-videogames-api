import { Router } from 'express';
import { verifyAdminToken } from '../../middlewares/admin-token';
import { validateQuery } from '../../middlewares/validate-query';
import * as soundtrackController from '../../controllers/v1/soundtrack.controller';

const router = Router();

const  validate_query_ost = validateQuery('soundtrack'); 

/**************************
    PUBLIC ENDPOINTS -> api/soundtracks
***************************/

router.get('/', validate_query_ost, soundtrackController.findAllSoundtracks);

router.get('/:id', soundtrackController.findOneSoundtrack);

/**************************
    ADMIN ENDPOINTS
***************************/

router.post('/', verifyAdminToken,  soundtrackController.createSoundtrack);

router.put('/:id', verifyAdminToken, soundtrackController.updateSoundtrack);

router.delete('/:id', verifyAdminToken, soundtrackController.deleteSoundtrack);

router.delete('/clean/db', verifyAdminToken, soundtrackController.deleteAllSoundtrack);

export default router;