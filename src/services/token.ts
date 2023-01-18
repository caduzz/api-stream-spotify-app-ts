import jwt from 'jsonwebtoken';

import { authConfig } from '../configs/auth';


interface SucessToken {
    error: undefined,
    decoded: string | jwt.JwtPayload | undefined
}

interface ErroToken {
    error: string,
}

type TokenParams = SucessToken | ErroToken 


export const tokenValidate = (authHeader: string) : TokenParams => {
    if(authConfig.secret){        
        const parts = authHeader.split(' ');
        if(parts.length !== 2)
            return { error: 'Token error' };
            
        const [ scheme, token ] = parts;
        if(!/^Bearer$/i.test(scheme))
            return { error: 'Token malformatted' };

        var response:TokenParams = {error: 'Token invalid'};
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if(err){ 
                response = { error: 'Token invalid'  }
            }
            response = {error: undefined, decoded }
        });

        return response;
    }
    return {error: undefined, decoded: ''}
}

export const generateToken = (params = {}) => {
    if(authConfig.secret){
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 864000
        });
    }
}

