export interface Categoria {
  id: string;
  nome: string;
  criadoEm: string;
  criadoPor: string;
  atualizadoEm: string;
}

export interface CategoriaPostDTO {
  nome: string;
}

export interface CategoriaPatchDTO {
  nome: string;
}
