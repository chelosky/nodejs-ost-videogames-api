import { Router } from 'express';
import * as soundtrackController from '../controllers/soundtrack.controller';

const router = Router();
const express = require('express');
let app = express();

// /api/tasks/
router.get('/', soundtrackController.findAllSoundtracks);

router.get('/:id', soundtrackController.findOneSoundtrack);

router.post('/', soundtrackController.createSoundtrack);

router.put('/:id', soundtrackController.updateSoundtrack);

router.delete('/:id', soundtrackController.deleteSoundtrack);

export default router;