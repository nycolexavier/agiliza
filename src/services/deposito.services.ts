import type {
  Deposito,
  DepositoPostDTO,
  DepositoPatchDTO,
} from '@/interfaces/Deposito/Deposito';
import api from './api';

export function DepositoList() {
  return api.get<Deposito[]>('/deposito');
}

export function DepositoListID(id: string) {
  return api.get(`/deposito/${id}`);
}

export function DepositoPost( payload: DepositoPostDTO) {
  return api.post(`/deposito`, payload);
}

export function DepositoIDPatch(id: string, payload: DepositoPatchDTO) {
  return api.patch(`/deposito/${id}`, payload);
}
