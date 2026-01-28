import type { Status } from './Status';

export enum TipoMovimentacao {
  ENTRADA = 'entrada',
  SAIDA = 'saida',
}

export interface Movimentacao {
  id: string;
  loteId: string;
  tipo: TipoMovimentacao;
  quantidade: number;
  dataMovimentacao: string;
  status: Status;
  idproduto?: number | null;
  idfornecedor?: number | null;
}

export interface MovimentacaoPostDTO {
  loteId: string;
  tipo: TipoMovimentacao;
  quantidade: number;
  dataMovimentacao: string;
  status?: Status;
  idproduto?: number;
  idfornecedor?: number;
  criadoPorId?: string
}

export interface MovimentacaoPatchDTO {
  loteId: string;
  tipo?: TipoMovimentacao;
  quantidade?: number;
  dataMovimentacao?: string;
  status?: Status;
  idproduto?: number;
  idfornecedor?: number;
}
