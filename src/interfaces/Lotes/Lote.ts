import type { Status } from '../Status';

export interface Lote {
  id: string;

  codigoLote: string;
  codigoBarra: string;

  precoCusto: number;
  precoVenda: number;
  quantidade: number;

  status: Status;
  dataValidade: string;

  produto: {
    id: string;
  };

  marca: {
    id: string;
  };

  deposito: {
    id: string;
  };

  fornecedor: {
    id: string;
  };

  criadoEm: string;
  atualizadoEm: string;
}

export interface LotePostDTO {
  codigoLote: string;
  codigoBarra: string;

  precoCusto: number;
  precoVenda: number;
  quantidade: number;

  status: Status;
  dataValidade: string;

  produtoId: string;
  marcaId: string;
  depositoId: string;
  fornecedorId: string;
}

export interface LotePatchDTO {
  codigoLote?: string;
  codigoBarra?: string;

  precoCusto?: number;
  precoVenda?: number;
  quantidade?: number;

  status?: Status;
  dataValidade?: string;

  produtoId?: string;
  marcaId?: string;
  depositoId?: string;
  fornecedorId?: string;
}
