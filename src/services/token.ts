import jwt from 'jsonwebtoken';

import { authConfig } from '../configs/auth';

export const tokenValidate = (authHeader: string) => {
    if(authConfig.secret){        
        const parts = authHeader.split(' ');
        if(parts.length !== 2)
            return { error: 'Token error' };
            
        const [ scheme, token ] = parts;
        if(!/^Bearer$/i.test(scheme))
            return { error: 'Token malformatted' };
            
        return jwt.verify(token, authConfig.secret, (err, decoded) => {
            if(err){ 
                return { error: 'Token invalid' }
            }
            return { sucess: 'Token Valido' }
        });
    }
}

export const generateToken = (params = {}) => {
    if(authConfig.secret){
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 864000
        });
    }
}

