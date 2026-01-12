
export interface Fornecedor {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  status: 'ativo' | 'inativo';
  telefone: string;
}