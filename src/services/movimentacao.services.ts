import type { Movimentacao, MovimentacaoPatchDTO, MovimentacaoPostDTO } from "@/interfaces/Movimentacao";
import api from "./api";

export function MovimentacaoList() {
  return api.get<Movimentacao[]>('/movimentacao');
}

export function MovimentacaoListID(id: string) {
  return api.get(`/movimentacao/${id}`);
}

export function MovimentacaoPost( payload: MovimentacaoPostDTO) {
  return api.post(`/movimentacao`, payload);
}

export function MovimentacaoIDPatch(id: string, payload: MovimentacaoPatchDTO) {
  return api.patch(`/movimentacao/${id}`, payload);
}
