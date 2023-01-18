export interface MusicParams {
    id?: string
    uri: string
    title: string
    cover: string
    color: string
    duration: number
    published?: boolean
    authorId: string
    date?: Date
}

export interface HistoricParams {
    id?: string
    date?: Date | string
    userId: string
    musicId: string
}

export interface UserParams {
    id?: string
    email: string
    name: string
    password: string
    author: boolean
}

export interface ErroUser {
    erro: boolean
    msg: string
    user?: UserParams 
}

export interface ErroMusic {
    erro: boolean
    msg: string
    music?: MusicParams 
}
export interface ErrorHistoric {
    erro: boolean
    msg: string
    historic?: HistoricParams
}
