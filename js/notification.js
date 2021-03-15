const NOTIFICATION_DELAY = 2000;

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
    clearInterval(notificationHideTimeout);
  }

  setInterval(() => {
    notificationElement.classList.remove('notification--show');
  }, NOTIFICATION_DELAY);
}
