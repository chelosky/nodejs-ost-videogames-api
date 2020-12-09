import { Router } from 'express';
import * as videogameController from '../controllers/videogame.controller';

const router = Router();

// /api/tasks/
router.get('/', videogameController.findAllVideogames);

router.post('/', videogameController.createVideogame);

router.get('/saga/:saga', videogameController.findAllSagaVideogames);

router.get('/:id', videogameController.findOneVideogame);

router.delete('/:id', videogameController.deleteVideogame);

router.put('/:id', videogameController.updateVideogame);

export default router;