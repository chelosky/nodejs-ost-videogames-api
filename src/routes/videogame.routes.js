import { Router } from 'express';
import * as videogameController from '../controllers/videogame.controller';

const router = Router();

// /api/tasks/
router.get('/all', videogameController.findAllVideogames);

router.post('/', videogameController.createVideogame);

router.get('/saga/:saga', videogameController.findAllSagaVideogames);

router.get('/:id', videogameController.findOneVideogame);

router.put('/:id', videogameController.updateVideogame);

router.delete('/:id', videogameController.deleteVideogame);

router.delete('/clean/db', videogameController.deleteAllVideogame);

export default router;