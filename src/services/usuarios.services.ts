import type { Usuario, UsuarioPatchDTO, UsuariosPostDTO } from '@/interfaces/Usuarios/Usuario';
import api from './api';

export function UsuariosList() {
  return api.get<Usuario[]>(`/users`);
}

export function UsuariosListID(id: string) {
  return api.get<Usuario>(`/users/${id}`);
}

export function UsuariosPost(payload: UsuariosPostDTO) {
  return api.post(`/users`, payload);
}

export function UsuariosIDPatch(id: string, payload: UsuarioPatchDTO) {
  return api.patch(`/users/${id}`, payload);
}
