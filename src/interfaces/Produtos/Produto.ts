import type { Status } from '../Status';

export interface Produto {
  id: string;
  nome: string;
  sku: number;
  isPerecivel: boolean;
  status: Status;
  categoria?: string;
  descricao?: string;
  criadoEm: string;
  criadoPor: string;
  atualizadoEm: string;
  categoriaId: string;
}

export interface ProdutosPostDTO {
  nome: string;
  sku: string;
  descricao?: string;
  status?: Status;
  categoria?: string;
  isPerecivel: boolean;
  categoriaId: string;
}

export interface ProdutosPatchDTO {
  nome: string;
  sku: string;
  categoria: string;
  categoriaId: string;
}
