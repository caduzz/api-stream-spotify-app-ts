export interface MusicParams {
    id?: string
    uri: string
    title: string
    cover: string
    color: string
    duration: number
    published: boolean
    authorId: string
}

export interface UserParams {
    id: string
    name: string
    email: string
    author: boolean
    password?: string
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
