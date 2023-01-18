import multer from 'multer';
import express from 'express';
import path from 'path'

import { coverMulterConfig, musicMulterConfig } from './configs/multer';

import { listHistoric, saveHistoric } from './controllers/historic';
import { registerUser, getAuthotMusic, login, validar } from './controllers/user';
import { getMusics, getMusicsStream, getUniqueMusic, saveMusic, searchMusic } from './controllers/music';
import { uploadCoverRequest, uploadMusicRequest } from './controllers/upload';

import { auth } from './middlewares/auth';

const musicUpload = multer(musicMulterConfig);
const coverUpload = multer(coverMulterConfig);

const routes = express.Router();

//Login Route
routes.post('/login', login)
routes.post('/validate', validar);
routes.post('/register', registerUser);

//Author Routes
routes.post('/author', getAuthotMusic);

//User Create
routes.post('/save/hitoric', saveHistoric)
routes.post('/list/hitoric', listHistoric)

//Music Routes
routes.use('/music/cover', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'image')))

routes.get('/list/musics', getMusics);
routes.get('/music/:musicName', getMusicsStream);

routes.post('/music', getUniqueMusic);
routes.post('/music/searsh', searchMusic);
routes.post('/music/create', saveMusic)

//Uploads routes
routes.post('/upload/music', musicUpload.single('music'), uploadMusicRequest)
routes.post('/upload/cover', coverUpload.single('cover'), uploadCoverRequest)

export = routes;