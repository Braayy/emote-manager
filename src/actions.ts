import { Level, notify } from './notification';

function validateToken(token: string): boolean {
  if (!token.match(/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/)) {
    notify('Invalid Token', Level.ERROR);

    return false;
  }

  return true;
}

export function add(token: string) {
  if (!validateToken(token)) return;
}

export function reset(token: string) {
  if (!validateToken(token)) return;
}

export function remove(token: string) {
  if (!validateToken(token)) return;
}
