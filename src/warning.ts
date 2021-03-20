export function acceptWarning() {
  localStorage.setItem('AcceptedWarning', 'true');

  document.querySelector('.warning-modal-wrapper').remove();
}

function hasAcceptedWarning(): boolean {
  const acceptedWarningString = localStorage.getItem('AcceptedWarning');

  return acceptedWarningString ? Boolean(acceptedWarningString) : false;
}

if (hasAcceptedWarning()) {
  acceptWarning();
}
