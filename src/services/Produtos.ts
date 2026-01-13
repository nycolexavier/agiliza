import type {
  Produto,
  ProdutosPatchDTO,
  ProdutosPostDTO,
} from '@/interfaces/Produtos/Produto';
import api from './api';

export function ProdutosList() {
  return api.get<Produto[]>(`/produtos`);
}
export function ProdutosListID(id: string) {
  return api.get(`/produtos/${id}`);
}
export function ProdutosPost(payload: ProdutosPostDTO) {
  return api.post(`/produtos`, payload);
}
export function ProdutosIDPatch(id: string, payload: ProdutosPatchDTO) {
  return api.patch(`/produtos/${id}`);
}
