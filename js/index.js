import { addEmotes, resetEmotes, removeEmotes } from './api.js';
import { ERROR, INFO, notify } from './notification.js';

(function(){
  let token = null;

  function validateToken() {
    if (!token) {
      notify('You did not paste your token!', ERROR);

      return false;
    }

    if (!token.match(/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/)) {
      notify('The token is invalid!', ERROR);

      return false
    }

    return true;
  }

  window.app = {
    addEmotes: () => {
      validateToken() && addEmotes(token);
    },
    resetEmotes: () => {
      validateToken() && resetEmotes(token);
    },
    removeEmotes: () => {
      validateToken() && removeEmotes(token);
    },
    pasteToken: () => {
      setTimeout(() => {
        const tokenField = document.querySelector('.token__input');
        token = tokenField.value;

        if (validateToken()) {
          notify('The token was pasted!', INFO);

          document.querySelector('.token').remove();
        } else {
          token = null;
          tokenField.value = '';
        }
      }, 1);
    }
  }
})()
