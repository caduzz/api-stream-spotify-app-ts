import { Request, Response } from 'express';

import fs from 'fs'
import { MusicParams } from '../@types/database';

import { createMusic, getAllMusics, searchMusicName } from "../services/music";
import { getUserID } from '../services/user';

export const getMusics = async (req: Request, res: Response) => {
    try {
        const musics = await getAllMusics();
    
        res.status(200).json(musics)
    } catch (err) {
        res.status(500).json({msg: 'music not found'})
    }
};

export const getMusicsStream = async (req: Request, res: Response) => {
    const { musicName } = req.params;
    
    const musicFile = `tmp/uploads/music/${musicName}`;
    try {
        fs.stat(musicFile, (err, stats) => {
            if (err) {
                console.log(err);
                return res.status(404).json({msg: 'music not found'});
            }
            
            const { range } = req.headers;
            const { size } = stats;
    
            const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
            const end = size - 1;
    
            res.writeHead(200, {
                'Content-Range': `bytes ${start}-${end}/${size}`,
                'Accept-Ranges': 'bytes',
                'Content-Type': 'audio/mp3',
                'Content-Length': size,
            });
    
            const stream = fs.createReadStream(musicFile, { start, end });
    
            //stream.on('end', () => console.log('acabou'));
            stream.pipe(res);
        });   
    } catch (err) {
        return res.status(500).json({msg: 'error playing the music'})
    }
};

export const searchMusic = async (req: Request, res:Response) => {
    const { title } = req.body
    try {
        const musicSearch = await searchMusicName(title)
        res.status(200).json(musicSearch)
    } catch (err) {
        return res.status(401).json({msg: 'sound not found'})
    }
}

export const uploadMusic = async (req: Request, res: Response) => {
    const { title, cover, color, authorId, published }: MusicParams = req.body

    try {
        const file = req.file;

        if(file){
            const { erro: idErro, msg: idMsg } = await getUserID(authorId);

            if( idErro )return res.status(401).json({ msg: idMsg })

            const { erro: createErro, msg: createMsg } = await createMusic({
                uri: file.filename,
                title,
                cover,
                color,
                duration: file.size,
                authorId, 
                published: published ? true : false  
            })

            if( createErro )return res.status(401).json({msg: createMsg})
        }
        

        return res.status(200).json({msg: 'song published successfully'});
    } catch(err) {
        return res.status(500).json({msg: 'error to published song'})
    }
}