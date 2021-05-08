import { Router } from 'express';
import { verifyAdminToken } from '../../middlewares/admin-token';
import { validateQuery } from '../../middlewares/validate-query';
import * as videogameController from '../../controllers/v1/videogame.controller';

const router = Router();

const  validate_query_vg = validateQuery('videogame'); 

/**************************
    PUBLIC ENDPOINTS -> api/videogame
***************************/

router.get('/', validate_query_vg, videogameController.findAllVideogames);


router.get('/:id', videogameController.findOneVideogame);

/**************************
 ADMIN ENDPOINTS
 ***************************/

router.post('/', verifyAdminToken, videogameController.createVideogame);

router.put('/:id', verifyAdminToken, videogameController.updateVideogame);

router.delete('/:id', verifyAdminToken, videogameController.deleteVideogame);

router.delete('/clean/db', verifyAdminToken, videogameController.deleteAllVideogame);

export default router;