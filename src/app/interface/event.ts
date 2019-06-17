export interface Event {
    uid?: string,
    foto?: string,
    nome?: string,
    data?: string,
    descricao?: string,
    preco?: string,
    quantIngressos?:number,
    local?: string,
    organizador?: {
        uid?: string,
        foto?: string,
        nome?: string,
        sobrenome?: string,
        cel?: string,
        cartao?: string,
        hist?: string,
        email?: string
    },
    categorias?: {},
    listaUsers?: {}
}
