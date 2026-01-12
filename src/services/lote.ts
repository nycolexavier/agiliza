import api from './api';
import type { Lote, LotePatchDTO, LotePostDTO } from '@/interfaces/Lotes/Lote';

export function LoteList() {
  return api.get<Lote[]>('/lotes');
}

export function LoteListID(id: string) {
  return api.get(`/lotes/${id}`);
}

export function LotePost(payload: LotePostDTO) {
  return api.post(`/lotes`, payload);
}

export function LoteIDPatch(id: string, payload: LotePatchDTO) {
  return api.patch(`/lotes/${id}`, payload);
}
