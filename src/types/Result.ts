// Define a estrutura de sucesso e de falha
export type Ok<T> = { readonly isOk: true; readonly value: T };
export type Err<E> = { readonly isOk: false; readonly error: E };

export type Result<T, E = Error> = Ok<T> | Err<E>;

// Funções utilitárias para construir os resultados
export const ok = <T>(value: T): Ok<T> => ({
  isOk: true,
  value,
});

export const err = <E>(error: E): Err<E> => ({
  isOk: false,
  error,
});