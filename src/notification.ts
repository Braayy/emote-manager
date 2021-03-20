const DELAY = 2000;

const notificationElement = document.querySelector('.notification');
const notificationTextElement = document.querySelector('.notification__text');

let hideId = 0;

export enum Level {
  INFO = 'info',
  ERROR = 'error'
}

export function notify(message: string, level: Level) {
  { // Reset Notification
    notificationElement.classList.remove(
      'notification--' + Level.INFO,
      'notification--' + Level.ERROR,
    );

    if (hideId !== 0) {
      clearTimeout(hideId);
    }
  }

  notificationElement.classList.add(
    'notification--' + level,
    'notification--show',
  );

  notificationTextElement.innerHTML = message;

  hideId = setTimeout(() => {
    notificationElement.classList.remove('notification--show');
  }, DELAY);
}
