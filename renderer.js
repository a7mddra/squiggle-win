const image = document.getElementById('image');
const uploadIcon = document.getElementById('upload-icon');

window.electron.onImagePath((path) => {
  image.src = path;
  image.style.display = 'block';
  uploadIcon.style.display = 'none';
});

uploadIcon.addEventListener('click', async () => {
  const filePath = await window.electron.openFileDialog();
  if (filePath) {
    image.src = filePath;
    image.style.display = 'block';
    uploadIcon.style.display = 'none';
  }
});
