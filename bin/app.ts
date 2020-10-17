import express from 'express';
import Main from './routes/api';

const Express = express();
const { API_VERSION } = process.env;

Express.use(express.json());

Express.use(`/api/v${API_VERSION}/`, Main);

export default Express;