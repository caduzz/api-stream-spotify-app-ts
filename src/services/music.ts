import { PrismaClient } from "@prisma/client";
import { ErroMusic, MusicParams } from "../@types/database";

const prisma = new PrismaClient();

export const getAllMusics = async () => {
    const music = await prisma.music.findMany({
        where: { 
            published: true
        },
        include: {
            author: true
        }
    });
    return music;
}

export const searchMusicName = async ( text: string ) => {  
    if(text !== ''){
        const music = await prisma.music.findMany({
            where: {
                AND: {
                    title: {
                        startsWith: text,
                    },
                    published: true
                }
            },
            include: {
                author: true
            }
        })
        return music
    }
}

export const createMusic = async ( data: MusicParams ) : Promise<ErroMusic> => {
    try{ 
        const music = await prisma.music.create({ data });
        return {erro: false, msg: 'sucess', music}
    }catch(err){
        console.log(err)
        return {erro: true, msg: 'error'};
    }
        
}