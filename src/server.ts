require('dotenv').config();

import express from 'express';
import morgan from 'morgan'
import processimage from 'express-processimage'
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(morgan('dev'));
app.use(processimage());                               //New line

app.use(routes)

app.listen(process.env.PORT, () => {
    console.log('O server foi iniciado na porta:', process.env.PORT)
});