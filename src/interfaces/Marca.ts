export interface Marca {
  id: string;
  nome: string;
  criadoEm: string;
  criadoPor: string;
  atualizadoEm: string;
}

export interface MarcaPostDTO {
  nome: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface MarcaPatchDTO {
  nome: string;
}
