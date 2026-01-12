export function useFormValidation() {
  function isEmail(valor: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  }

  function isRequired(valor: string) {
    return !!valor && valor.trim().length > 0;
  }

  function minLength(valor: string, min: number) {
    return valor.length >= min;
  }

  return {
    isEmail,
    isRequired,
    minLength,
  };
}