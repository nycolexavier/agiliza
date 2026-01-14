import type { Cargo } from "../Cargo";

export interface Usuario {
  id: string;
  nome: string;
  cargo: Cargo[];
  email: string;
  status: 'ativo' | 'inativo';
  telefone: string;
  criadoEm: string;
  criadoPor: string;
  atuaizadoEm: string;
}

export interface UsuarioPatchDTO {
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
}

export interface UsuariosPostDTO {
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
}
