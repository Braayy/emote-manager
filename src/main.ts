import '../style/index.scss';
import { acceptWarning } from './warning';
import { add, remove, reset } from './actions';
import { Level, notify } from './notification';
import { validateToken } from './util';

import { EmoteManager } from './types';

window.emoteManager = {
  token: 'invalid',

  setToken(tokenInput: HTMLInputElement) {
    setTimeout(() => {
      const token = tokenInput.value;
      tokenInput.value = '';

      if (!validateToken(token)) {
        notify('Invalid Token', Level.ERROR);

        return;
      }

      this.token = token;

      
      tokenInput.remove();

      notify('The token was pasted!', Level.INFO);
    }, 1);
  },

  add() {
    add(this.token);
  },

  reset() {
    reset(this.token);
  },

  remove() {
    remove(this.token);
  },

  acceptWarning
};
declare global {
  interface Window {
    emoteManager: EmoteManager
  }
}
