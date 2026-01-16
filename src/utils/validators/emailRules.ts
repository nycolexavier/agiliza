export const emailRules = [
  (v: string) => !!v || 'Email é obrigatório',
  (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email inválido',
];
