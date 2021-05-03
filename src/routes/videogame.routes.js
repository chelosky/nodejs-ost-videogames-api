import { Router } from 'express';
import { verifyAdminToken } from '../middlewares/admin-token';
import * as videogameController from '../controllers/videogame.controller';
import { validateQuery } from '../middlewares/validate-query';

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

// router.post('/name/:name', verifyAdminToken, videogameController.findVideogameName);

// router.post('/saga/:saga', verifyAdminToken, videogameController.findAllSagaVideogames);

router.delete('/:id', verifyAdminToken, videogameController.deleteVideogame);

router.delete('/clean/db', verifyAdminToken, videogameController.deleteAllVideogame);

export default router;