import { WebviewBuilder } from '../../shared/webview/builder.js';

export function createPage() {
  let hasResults = false;
  let captchaDetected = false;

  const wrapper = document.createElement('div');
  wrapper.className = 'page-wrapper';
  wrapper.style.width = '100%';
  wrapper.style.height = '100%';

  const { container: webviewContainer, webview } = WebviewBuilder.createLensWebview();

  wrapper.appendChild(webviewContainer);

  return wrapper;
}
