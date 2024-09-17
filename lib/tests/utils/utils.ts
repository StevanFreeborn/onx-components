import { TemplateResult } from './../../node_modules/@open-wc/testing-helpers/types/src/scopedElementsWrapper.d';

export function createScreenshotWrapper(element: string | Element) {
  const wrapper = document.createElement('div');
  wrapper.style.display = 'block';
  wrapper.style.width = 'max-content';
  wrapper.style.padding = '1rem';

  if (typeof element === 'string') {
    wrapper.innerHTML = element;
  } else {
    wrapper.appendChild(element);
  }

  return wrapper;
}
