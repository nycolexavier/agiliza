export interface Deposito {
  id: string;
  corredor: string;
  prateleira: string;
  sessao: string;
  quantidadeMaxima: string;
  criadoPor: string;
  atualizadoEm: string;
}

export interface DepositoPostDTO {
  corredor: string;
  prateleira: string;
  sessao: string;
  quantidadeMaxima: string;
}

export interface DepositoPatchDTO {
  corredor: string;
  prateleira: string;
  sessao: string;
  quantidadeMaxima: string;
}
