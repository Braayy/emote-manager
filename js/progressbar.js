export function updateProgressBar(progress) {
  const progressBarElement = document.querySelector('.progress-bar');

  const percentage = progress * 100;

  progressBarElement.style.background = `linear-gradient(to right, var(--progress-bar) 0% ${percentage}%, var(--secondary) ${percentage}% 100%)`;
}

export function clearProgressBar() {
  const progressBarElement = document.querySelector('.progress-bar');
  progressBarElement.removeAttribute('style');
}
