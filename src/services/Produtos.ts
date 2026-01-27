import type {
  Produto,
  ProdutosPatchDTO,
  ProdutosPostDTO,
} from '@/interfaces/Produtos/Produto';
import api from './api';

export function ProdutosList() {
  return api.get<Produto[]>(`/products`);
}
export function ProdutosListID(id: string) {
  return api.get(`/products/${id}`);
}
export function ProdutosPost(payload: ProdutosPostDTO) {
  return api.post(`/products`, payload);
}
export function ProdutosIDPatch(id: string, payload: ProdutosPatchDTO) {
  return api.patch(`/products/${id}`);
}
