import api from './api';
import type { EnderecoDto } from '@/interfaces/Endereco';

export function EnderecosList() {
  return api.get<EnderecoDto[]>(`/enderecos`);
}

export function EnderecosListID(id: string) {
  return api.get<EnderecoDto>(`/enderecos/${id}`);
}

export function EnderecosPost(payload: EnderecoDto) {
  return api.post(`/enderecos`, payload);
}

export function EnderecosIDPatch(id: string, payload: EnderecoDto) {
  return api.patch(`/enderecos/${id}`, payload);
}
