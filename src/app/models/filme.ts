export interface Filme {
  idFilme: number;
  titulo: string;
  descricao: string;
  poster: string;
  duracao: number;
  idGenero?: number | null;
}
