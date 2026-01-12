import type { Usuario, UsuarioPatchDTO, UsuariosPostDTO } from '@/interfaces/Usuarios/Usuario';
import api from './api';

export function UsuariosList() {
  return api.get<Usuario[]>(`/usuarios`);
}

export function UsuariosListID(id: string) {
  return api.get<Usuario>(`/usuarios/${id}`);
}

export function UsuariosPost(payload: UsuariosPostDTO) {
  return api.post(`/usuarios`, payload);
}

export function UsuariosIDPatch(id: string, payload: UsuarioPatchDTO) {
  return api.patch(`/usuarios/${id}`, payload);
}
