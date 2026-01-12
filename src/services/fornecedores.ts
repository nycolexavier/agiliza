import type {
  Fornecedor,
  FornecedorPatchDTO,
  FornecedorPostDTO,
} from '@/interfaces/Fornecedores/Fornecedor';
import api from './api';

export function FornecedoresList() {
  return api.get<Fornecedor[]>(`/fornecedores`);
}

export function FornecedoresListID(id: string) {
  return api.get<Fornecedor>(`/fornecedores/${id}`);
}

export function FornecedoresPost(payload: FornecedorPostDTO) {
  return api.post(`/fornecedores`, payload);
}

export function DepositoIDPatch(id: string, payload: FornecedorPatchDTO) {
  return api.patch(`/fornecedores/${id}`, payload);
}
