export interface EnderecoDto {
  userId: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  estado: string;
  atualizadoEm?: string;
  criadoEm?: string;
  criadoPor?: string;
}