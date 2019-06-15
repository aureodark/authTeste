export interface Event {
    uid?: string,
    foto?: string,
    nome?: string,
    categorias?: string[],
    data?: string,
    descricao?: string,
    preco?: string,
    quantIngressos?:string,
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
