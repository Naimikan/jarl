import { beforeEach, describe, expect, it } from 'vitest';

import { getFocusableElements } from './getFocusableElements';

describe('getFocusableElements', () => {
  beforeEach(() => {
    // Clear the DOM before each test to ensure a clean slate
    document.body.innerHTML = '';
  });

  it('should fallback to document.body if no root element is provided', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);

    const result = getFocusableElements();
    expect(result.length).toBe(1);
    expect(result[0]).toBe(button);
  });

  it('should scope the search to the provided root element', () => {
    const root = document.createElement('div');
    const insideButton = document.createElement('button');
    const outsideButton = document.createElement('button');

    root.appendChild(insideButton);
    document.body.appendChild(root);
    document.body.appendChild(outsideButton);

    const result = getFocusableElements(root);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(insideButton);
  });

  it('should find all standard focusable interactive elements', () => {
    document.body.innerHTML = `
      <a href="https://google.com">Link</a>
      <button>Button</button>
      <textarea></textarea>
      <input type="text" />
      <select><option>1</option></select>
      <div tabindex="0">Tabindex 0</div>
      <div contenteditable="true">Editable</div>
      <details><summary>Summary</summary></details>
      <audio controls></audio>
      <video controls></video>
      <iframe></iframe>
    `;

    const result = getFocusableElements();
    // It should find exactly 11 elements (one for each selector in your array)
    expect(result.length).toBe(11);
  });

  it('should exclude elements that are disabled', () => {
    document.body.innerHTML = `
      <button disabled>Disabled Button</button>
      <input type="text" disabled />
      <textarea disabled></textarea>
      <select disabled><option>1</option></select>
      <a href="#" disabled>Link with disabled attribute</a>
    `;

    const result = getFocusableElements();
    expect(result.length).toBe(0);
  });

  it('should exclude elements with negative tabindexes', () => {
    document.body.innerHTML = `
      <div tabindex="-1">Not Focusable</div>
      <span tabindex="-2">Also Not Focusable</span>
    `;

    const result = getFocusableElements();
    expect(result.length).toBe(0);
  });

  it('should exclude inputs with type="hidden"', () => {
    document.body.innerHTML = `
      <input type="hidden" name="token" value="123" />
    `;

    const result = getFocusableElements();
    expect(result.length).toBe(0);
  });

  it('should exclude media tags (audio/video) if they lack the controls attribute', () => {
    document.body.innerHTML = `
      <audio src="audio.mp3"></audio>
      <video src="video.mp4"></video>
    `;

    const result = getFocusableElements();
    expect(result.length).toBe(0);
  });

  it('should return an empty NodeList if no focusable elements are present', () => {
    document.body.innerHTML = `
      <div>Just a plain div</div>
      <p>Plain text paragraph</p>
      <span>Plain span</span>
    `;

    const result = getFocusableElements();
    expect(result.length).toBe(0);
  });
});
