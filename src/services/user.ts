import { PrismaClient } from "@prisma/client";
import { ErroUser } from "../@types/database";

const prisma = new PrismaClient();

//get user by id
export const getUserID = async (id: string): Promise<ErroUser> => {
    try {
        const user = await prisma.user.findUniqueOrThrow({ where: { id } }); 
        return {erro: false, msg: 'sucesso', user}
    } catch (err) {
        return {erro: true, msg: 'error: author not found'}
    }
}

export const userLogin = async (email: string): Promise<ErroUser> => {
    try {
        const user = await prisma.user.findUniqueOrThrow({ where: { email } });; 

        if(user){
            return {erro: false, msg: 'sucesso', user}
        }else {
            return {erro: true, msg: 'error: author not found'}
        }
    } catch (err) {
        return {erro: true, msg: 'error: author not found'}
    }
}
 