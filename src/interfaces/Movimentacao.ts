import type { Status } from './Status';

export type TipoMovimentacao = 'entrada' | 'saida';

export interface Movimentacao {
  id: number;
  idlote: number;
  tipomovimentacao: TipoMovimentacao;
  quantidade: number;
  datamovimentacao: string;
  status: Status;
  idproduto?: number | null;
  idfornecedor?: number | null;
}

export interface MovimentacaoPostDTO {
  idlote: number;
  tipomovimentacao: TipoMovimentacao;
  quantidade: number;
  datamovimentacao: string;
  status?: Status;
  idproduto?: number;
  idfornecedor?: number;
}

export interface MovimentacaoPatchDTO {
  idlote?: number;
  tipomovimentacao?: TipoMovimentacao;
  quantidade?: number;
  datamovimentacao?: string;
  status?: Status;
  idproduto?: number;
  idfornecedor?: number;
}
