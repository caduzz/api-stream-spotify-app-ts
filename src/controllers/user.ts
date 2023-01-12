import { Request, Response} from 'express';

import { getUserID, userLogin } from "../services/user";

import bcrypt from 'bcryptjs';
import { generateToken, tokenValidate } from '../services/token';


export const getAuthotMusic = async (req: Request, res: Response) => {
    try {
        const {id} = req.body;
        const { user } = await getUserID(id);
        
        if(user){
            const { id, name } = user;
            return res.status(200).json({id, name});
        }
    } catch (err) {
        return res.status(404).json({msg: 'error: user not found'})
    }
};

export const registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try{
        if(!email || !password)
            return res.status(200).json({error: 'Please enter the username and password'});

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        return res.status(200).json({hash})
    }catch(err){
        return res.status(200).json({error: 'Authenticate failed'})
    }
}

export const validar = async (req: Request, res: Response) => {
    const { token } = req.body;
    if(!token)return res.json({error: 'Informe um token'})
    const validar = tokenValidate(token);

    return res.status(200).json({validate: !validar?.error})
}

export const login = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;
        if(!email || !password)
            return res.status(200).json({error: 'Please enter the username and password'});

        const { user } = await userLogin(email)

        if(!user)
            return res.status(200).json({error: 'User not found'});

        if(user.password){
            if(!await bcrypt.compare( password, user.password ))
                return res.status(200).json({error: 'Invalid password'});
            
            const token = generateToken({ id: user.id });
            const usuario = {
                id: user.id, 
                author: user.author, 
                email: user.email, 
                name: user.name, 
                token: token
            }
            res.status(200).json(usuario)
        }
    }catch(err){
        return res.status(200).json({error: 'Authenticate failed'})
    }
}