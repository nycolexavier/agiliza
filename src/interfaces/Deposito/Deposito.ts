export interface Deposito {
  id: string;
  corredor: string;
  temProduto: string;
  criadoPor: string;
  atualizadoEm: string;
}

export interface DepositoPostDTO {
  corredor: string;
  temProduto: boolean;
}

export interface DepositoPatchDTO {
  corredor: string;
  temProduto: string;
}
