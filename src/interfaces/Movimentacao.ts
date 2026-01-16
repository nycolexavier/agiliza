import type { Status } from './Status';

export enum TipoMovimentacao {
  ENTRADA = 'entrada',
  SAIDA = 'saida',
}

export interface Movimentacao {
  id: string;
  idlote: number;
  tipomovimentacao: TipoMovimentacao;
  quantidade: number;
  datamovimentacao: string;
  status: Status;
  idproduto?: number | null;
  idfornecedor?: number | null;
}

export interface MovimentacaoPostDTO {
  idlote: string;
  tipomovimentacao: TipoMovimentacao;
  quantidade: number;
  datamovimentacao: string;
  status?: Status;
  idproduto?: number;
  idfornecedor?: number;
}

export interface MovimentacaoPatchDTO {
  idlote: string;
  tipomovimentacao?: TipoMovimentacao;
  quantidade?: number;
  datamovimentacao?: string;
  status?: Status;
  idproduto?: number;
  idfornecedor?: number;
}
