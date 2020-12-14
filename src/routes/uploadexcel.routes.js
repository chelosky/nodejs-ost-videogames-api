import { Router } from 'express';
import * as uploadexcelController from '../controllers/uploadexcel.controller';

const router = Router();

// API para subir archivos
router.post('/uploadfile', uploadexcelController.upload.single("uploadfile"), uploadexcelController.importExcelData2MongoDB);

export default router;