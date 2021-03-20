export interface EmoteManager {
  token: string,
  setToken(tokenInput: HTMLInputElement): void,

  add(token: string): void,
  reset(token: string): void,
  remove(token: string): void,

  acceptWarning(): void,
}
