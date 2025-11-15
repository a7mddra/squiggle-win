

document.querySelector('.close-btn').addEventListener('click', () => {
  window.electron.closeWindow();
});

document.querySelector('.minimize-btn').addEventListener('click', () => {
  window.electron.minimizeWindow();
});

document.querySelector('.maximize-btn').addEventListener('click', () => {
  window.electron.maximizeWindow();
});

export function showFeedbackMessage(message, type) {
  const feedbackMessage = document.getElementById("feedbackMessage");
  feedbackMessage.textContent = message;
  feedbackMessage.className = "feedback-message";
  feedbackMessage.classList.add(type, "show");

  setTimeout(() => {
    feedbackMessage.classList.remove("show");
  }, 3000);
}