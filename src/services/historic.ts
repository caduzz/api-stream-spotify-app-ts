import { PrismaClient } from "@prisma/client";
import { ErrorHistoric, HistoricParams, MusicParams } from "../@types/database";

const prisma = new PrismaClient();

interface HistoricInterface {
    id: string;
    cover: string;
    title: string;
    author: {
        id: string;
        name: string;
    },
    date: Date
}

export const createHistoric = async ( data: HistoricParams ) : Promise<ErrorHistoric> => {
    try{ 
        const historic = await prisma.historic.create({ data });
        
        return { erro: false, msg: 'sucess', historic}
    }catch(err){

        return { erro: true, msg: 'erro' }
    }
}

export const getHistoric = async ( userId: string ) : Promise<HistoricInterface[] | {erro: true}> => {
    try{ 
        const historic = await prisma.historic.findMany({ 
                where: { userId }, 
                include: { 
                    musics: {
                        select: {
                            id: true,
                            author: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }, 
                            cover: true,
                            title: true
                        }
                    }
                },
                orderBy: { date: 'desc' },
            });

        var musicsList: HistoricInterface[] = [];

        historic.map(music => {
            musicsList.push({...music.musics, date: music.date})
        })

        return musicsList;
    }catch(err){
        console.log(err)
        return { erro: true }
    }
}