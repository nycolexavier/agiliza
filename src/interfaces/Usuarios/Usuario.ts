import type { Cargo } from '../Cargo';
import type { Status } from '../Status';

export interface Usuario {
  id: string;
  name: string;
  cargo: Cargo[];
  email: string;
  status: Status;
  telefone: string;
  criadoEm: string;
  criadoPor: string;
  atuaizadoEm: string;
}

export interface UsuarioPatchDTO {
  name: string;
  email: string;
  telefone: string;
}

export interface UsuariosPostDTO {
  name: string;
  cargo: string;
  email: string;
}
