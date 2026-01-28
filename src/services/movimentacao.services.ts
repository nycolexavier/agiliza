import type { Movimentacao, MovimentacaoPatchDTO, MovimentacaoPostDTO } from "@/interfaces/Movimentacao";
import api from "./api";

export function MovimentacaoList() {
  return api.get<Movimentacao[]>('/movimentacoes');
}

export function MovimentacaoListID(id: string) {
  return api.get(`/movimentacoes/${id}`);
}

export function MovimentacaoPost( payload: MovimentacaoPostDTO) {
  return api.post(`/movimentacoes`, payload);
}

export function MovimentacaoIDPatch(id: string, payload: MovimentacaoPatchDTO) {
  return api.patch(`/movimentacoes/${id}`, payload);
}
