interface Store {
  token: string,
  updating: boolean,
}

export const store: Store = {
  token: 'invalid',
  updating: false,
};

export function setToken(token: string) {
  store.token = token;
}

export function setUpdating(updating: boolean) {
  store.updating = updating;
}
