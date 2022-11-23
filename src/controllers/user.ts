import { Request, Response} from 'express';

import { getUserID } from "../services/user";

export const getAuthotMusic = async (req: Request, res: Response) => {
    try {
        const {id} = req.body;
        const { user } = await getUserID(id);
        
        return res.status(200).json(user)
    } catch (err) {
        return res.status(404).json({msg: 'error: user not found'})
    }
};