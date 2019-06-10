export interface Event {
    uid?: string,
    foto?: string,
    nome?: string,
    categoria?: string,
    data?: string,
    descricao?: string,
    preco?: string,
    local?: string,
    listaUsers?: {
        uid?: string,
        nome?: string,
        sobrenome?: string,
        foto?: string,
        email?: string,
        cel?: string
    },
    organizador?: {
        uid?: string,
        foto?: string,
        nome?: string,
        sobrenome?: string,
        cel?: string,
        cartao?: string,
        hist?: string,
        email?: string
    }
}