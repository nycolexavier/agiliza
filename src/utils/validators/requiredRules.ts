export const requiredRule = (label = 'Campo') => [
  (v: string) => !!v || `${label} é obrigatório`,
];
