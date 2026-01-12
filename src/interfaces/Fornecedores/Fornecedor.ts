export interface Fornecedor {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  status: 'ativo' | 'inativo';
  telefone: string;
}

export interface FornecedorPostDTO {
  nome: string;
  cargo: string;
  email: string;
  status: string;
  telefone: string;
}

export interface FornecedorPatchDTO {
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
}
