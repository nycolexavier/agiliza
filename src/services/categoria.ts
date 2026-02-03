import type { Categoria, CategoriaPatchDTO, CategoriaPostDTO } from '@/interfaces/Categoria';
import api from './api';

export function CategoriaList() {
  return api.get<Categoria[]>(`/categorias`);
}

export function CategoriaListID(id: string) {
  return api.get<Categoria>(`/categorias/${id}`);
}

export function CategoriaPost(payload: CategoriaPostDTO) {
  return api.post(`/categorias`, payload);
}

export function CategoriaIDPatch(id: string, payload: CategoriaPatchDTO) {
  return api.patch(`/categorias/${id}`, payload);
}
