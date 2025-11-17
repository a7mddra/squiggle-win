
function createAiModeTab(imageData) {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.height = '100%';
  container.style.gap = '12px';

  // Image viewer
  const img = document.createElement('img');
  img.style.maxWidth = '100%';
  img.style.maxHeight = '60%';
  img.alt = 'Preview';

  if (imageData && imageData.path) {
    // Use file:// URL so the renderer loads the local file at full quality
    img.src = `file://${imageData.path}`;
    img.dataset.path = imageData.path;
    if (imageData.size) img.dataset.size = imageData.size;
    if (imageData.format) img.dataset.format = imageData.format;
  } else {
    img.style.display = 'none';
  }

  const caption = document.createElement('div');
  caption.textContent = 'this is aimode tab';
  caption.style.marginTop = '8px';

  container.appendChild(img);
  container.appendChild(caption);

  return container;
}

export { createAiModeTab };
