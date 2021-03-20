const progressBarElement: HTMLDivElement = document.querySelector('.manager-form__progress-bar');

export function updateProgressBar(progress: number) {
  const percent = progress * 100;

  progressBarElement.style.background = `linear-gradient(to right, var(--progress-bar-progress) 0% ${percent}%, var(--progress-bar-empty) ${percent}% 100%)`;
}

export function clearProgressBar() {
  progressBarElement.removeAttribute('style');
}
