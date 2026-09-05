export interface ImovelFoto{
    id: number;
    imovel: number;
    imagem: string;
}

export interface Imovel{
    id: number;
    anfitriao: string;
    titulo: string;
    cidade: string;
    descricao: string;
    endereco: string;
    diaria: string;
    max_hospedes: number;
    publicado: boolean;
    data_criacao: string;
    fotos: ImovelFoto[];
}