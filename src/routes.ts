import multer from 'multer';
import express from 'express';
import path from 'path'

import { mullterConfig } from './configs/multer';
import { getAuthotMusic } from './controllers/user';
import { getMusics, getMusicsStream, searchMusic, uploadMusic } from './controllers/music';

const fileUpload = multer(mullterConfig);

const routes = express.Router();

//Author Routes
routes.post('/author', getAuthotMusic);

//Music Routes
routes.get('/list/musics', getMusics);
routes.post('/musuc/searsh', searchMusic);
routes.post('/music/upload', fileUpload.array('files'), uploadMusic)
routes.use('/music/cover', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'image')))
routes.get('/music/:musicName', getMusicsStream);

export = routes;