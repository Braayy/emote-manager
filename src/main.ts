import '../style/index.scss';

import { add, remove, reset } from './actions/index';
import { Level, notify } from './notification';
import { acceptWarning } from './warning';
import { setToken } from './store';
import { validateToken } from './util';

window.onAcceptWarning = function() {
  acceptWarning();
}

window.onAdd = function() {
  add().catch((err) => {
    notify('Something went wrong! See console', Level.ERROR);

    console.error(err);
  });
}

window.onReset = function() {
  reset().catch((err) => {
    notify('Something went wrong! See console', Level.ERROR);

    console.error(err);
  });
}

window.onRemove = function() {
  remove().catch((err) => {
    notify('Something went wrong! See console', Level.ERROR);

    console.error(err);
  });
}

window.onPasteToken = function(input: HTMLInputElement) {
  setTimeout(() => {
    const token = input.value;
    input.value = '';

    if (!validateToken(token)) {
      notify('Invalid Token', Level.ERROR);

      return;
    }

    input.remove();

    setToken(token);

    notify('Token pasted!', Level.INFO);
  }, 1);
}

declare global {
  interface Window {
    onAcceptWarning: () => void,
    onAdd: () => void,
    onReset: () => void,
    onRemove: () => void,
    onPasteToken: (input: HTMLInputElement) => void,
  }
}
