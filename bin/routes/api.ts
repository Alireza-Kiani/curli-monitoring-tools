import { Router } from 'express';
import ApiController from '../controllers/api';

const Main = Router();

Main.get('/:input', ApiController.getStats);

Main.post('/saveLink', ApiController.saveLink);

Main.post('/saveSite', ApiController.saveSite);

export default Main;