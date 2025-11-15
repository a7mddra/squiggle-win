const loginScreen = document.getElementById('login-screen');
const image = document.getElementById('image');
const loginBtn = document.getElementById('login-btn');
let imagePath;

window.electron.onImagePath((path) => {
  imagePath = path;
});

loginBtn.addEventListener('click', () => {
  if (imagePath) {
    image.src = imagePath;
    image.style.display = 'block';
    loginScreen.style.display = 'none';
  }
});

// Initially, show the login screen
loginScreen.style.display = 'block';
image.style.display = 'none';