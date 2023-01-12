import { getAudioDurationInSeconds } from 'get-audio-duration' 

import getColors from 'get-image-colors' 

import { Request, Response } from 'express'

export const uploadMusicRequest = (req: Request, res: Response) => {
    try {
        if(req.file){
            const { filename: uri, path: localArquivo } = req.file;

            getAudioDurationInSeconds(localArquivo).then((duration) => {
                duration = duration * 1000;
                const int = String(duration).split('.')
                duration = Number(int[0])
                
                res.json({uri, duration})
            })
        }
    } catch (error) {
        res.json({error: 'file error'})
    }
}
export const uploadCoverRequest = (req: Request, res: Response) => {
    try {
        if(req.file){
            const { filename: cover, path: localArquivo } = req.file
            getColors(localArquivo).then(colors => {
                const color = colors.map(color => color.hex())
                res.json({cover, color})
            })
        }
    } catch (error) {
        res.json({error: 'file error'})
    }
}