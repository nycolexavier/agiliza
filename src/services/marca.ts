import type { Marca, MarcaPatchDTO, MarcaPostDTO } from '@/interfaces/Marca';
import api from './api';

export function MarcaList() {
  return api.get<Marca[]>(`/marcas`);
}

export function MarcaListID(id: string) {
  return api.get<Marca>(`/marcas/${id}`);
}

export function MarcaPost(payload: MarcaPostDTO) {
  return api.post(`/marcas`, payload);
}

export function MarcaIDPatch(id: string, payload: MarcaPatchDTO) {
  return api.patch(`/marcas/${id}`, payload);
}
