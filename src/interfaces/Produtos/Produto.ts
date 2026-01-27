import type { Status } from '../Status';

export interface Produto {
  id: string;
  nome: string;
  sku: number;
  status: Status;
  categoria: string;
  descricao: string;
  criadoEm: string;
  criadoPor: string;
  atualizadoEm: string;
}

export interface ProdutosPostDTO {
  nome: string;
  sku: string;
  status: Status;
  categoria: string;
}

export interface ProdutosPatchDTO {
  nome: string;
  sku: string;
  categoria: string;
}
