import type { Status } from '../Status';

export interface Fornecedor {
  id: string;
  nome: string;
  cargo: string;
  email: string;
  status: Status;
  telefone: string;
}

export interface FornecedorPostDTO {
  nome: string;
  email: string;
  status: Status;
  telefone: string;
}

export interface FornecedorPatchDTO {
  nome: string;
  email: string;
  telefone: string;
}
