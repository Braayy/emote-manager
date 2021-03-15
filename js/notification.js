import { NOTIFICATION_DELAY } from './config.js';

let notificationHideTimeout = 0;

export const INFO = 'info';
export const ERROR = 'error';

export function notify(message, level) {
  const notificationElement = document.querySelector('.notification');
  const notificationTextElement = document.querySelector('.notification__text');

  notificationTextElement.innerHTML = message;

  notificationElement.classList.add('notification--' + level);

  notificationElement.classList.add('notification--show');

  if (notificationHideTimeout !== 0) {
    clearTimeout(notificationHideTimeout);
  }

  setTimeout(() => {
    notificationElement.classList.remove('notification--show');
  }, NOTIFICATION_DELAY);
}
