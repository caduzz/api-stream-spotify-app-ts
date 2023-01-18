import { Request, Response } from "express";

import { createHistoric, getHistoric } from "../services/historic";
import { getUserID } from "../services/user";

export const saveHistoric = async (req: Request, res: Response) => {
    try {
        const { musicId, userId }= req.body;
        if(userId){
            const { erro: idErro, msg: idMsg } = await getUserID(userId);

            if( idErro )return res.status(401).json({ msg: idMsg })

            const { erro: createErro, msg: createMsg } = await createHistoric({
                musicId,
                userId
            })

            if( createErro )return res.status(401).json({msg: createMsg})

            return res.status(200).json({msg: 'successfully save historic'});
        }
    } catch(err) {
        return res.status(500).json({msg: 'error to save historic'})
    }
}
export const listHistoric = async (req: Request, res: Response) => {
    try {
        const { userId }= req.body;
        if(userId){
            const { erro: idErro, msg: idMsg } = await getUserID(userId);

            if( idErro )return res.status(401).json({ msg: idMsg })

            const historics = await getHistoric(userId);

            return res.status(200).json(historics);
        }
    } catch(err) {
        return res.status(500).json({msg: 'error to save historic'})
    }
}