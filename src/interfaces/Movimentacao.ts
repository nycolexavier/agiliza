export interface Movimentacao {
  id: string;
  idlote: number;
  tipomovimentacao: 'entrada' | 'saida';
  quantidade: string;
  datamovimentacao: string;
  status: string;
}

export interface MovimentacaoPostDTO {
  id?: string;
  idlote: number;
  tipomovimentacao: string;
  quantidade: number;
  datamovimentacao: string;
  status: string;
  idproduto?: string;
}

export interface MovimentacaoPatchDTO {
  tipomovimentacao: string;
  quantidade: string;
  datamovimentacao: string;
  idlote: string;
  idproduto?: string;
  idfornecedor?: string;
}
