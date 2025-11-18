// Inline Translator - Content Script
// Handles text selection, replacement, and toggling

let isTranslating = false;
let currentRange = null;
let settings = {
  targetLanguage: 'en',
  minCharacters: 3
};

// Load settings from storage
chrome.storage.sync.get(['targetLanguage', 'minCharacters'], (result) => {
  if (result.targetLanguage) settings.targetLanguage = result.targetLanguage;
  if (result.minCharacters) settings.minCharacters = result.minCharacters;
});

// Listen for settings updates
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.targetLanguage) settings.targetLanguage = changes.targetLanguage.newValue;
    if (changes.minCharacters) settings.minCharacters = changes.minCharacters.newValue;
  }
});

// Text selection handler
document.addEventListener('mouseup', async (e) => {
  // Don't translate if clicking on already translated text
  if (e.target.classList.contains('inline-translated')) {
    return;
  }

  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  // Check if text is valid for translation
  if (selectedText.length < settings.minCharacters) {
    return;
  }

  // Don't translate inside input fields, textareas, or contenteditable elements
  const activeElement = document.activeElement;
  if (activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.isContentEditable) {
    return;
  }

  // Prevent multiple simultaneous translations
  if (isTranslating) {
    return;
  }

  try {
    isTranslating = true;
    const range = selection.getRangeAt(0);
    currentRange = range.cloneRange();

    // Check if already translated
    const container = range.commonAncestorContainer;
    if (container.nodeType === Node.ELEMENT_NODE &&
        container.classList?.contains('inline-translated')) {
      return;
    }

    // Request translation from background script
    const response = await chrome.runtime.sendMessage({
      action: 'translate',
      text: selectedText,
      targetLang: settings.targetLanguage
    });

    if (response.success && response.translatedText) {
      // Only replace if translation is different from original
      if (response.translatedText.toLowerCase() !== selectedText.toLowerCase()) {
        replaceWithTranslation(currentRange, selectedText, response.translatedText);

        // Clear selection
        selection.removeAllRanges();
      }
    } else if (response.error) {
      console.error('Translation error:', response.error);
      showNotification('Translation failed. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Error during translation:', error);
  } finally {
    isTranslating = false;
  }
});

// Replace selected text with translation
function replaceWithTranslation(range, originalText, translatedText) {
  try {
    // Create wrapper span for translated text
    const span = document.createElement('span');
    span.className = 'inline-translated';
    span.textContent = translatedText;
    span.dataset.original = originalText;
    span.dataset.translated = translatedText;
    span.title = 'Click to see original text';

    // Replace the selected text
    range.deleteContents();
    range.insertNode(span);

    // Add subtle animation
    span.style.animation = 'fadeIn 0.3s ease-in';
  } catch (error) {
    console.error('Error replacing text:', error);
  }
}

// Toggle between original and translated text
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('inline-translated')) {
    e.preventDefault();
    e.stopPropagation();

    const original = e.target.dataset.original;
    const translated = e.target.dataset.translated;
    const current = e.target.textContent;

    // Toggle text
    if (current === translated) {
      e.target.textContent = original;
      e.target.title = 'Click to see translation';
      e.target.style.backgroundColor = 'rgba(255, 193, 7, 0.15)';
      e.target.style.borderBottomColor = '#ffc107';
    } else {
      e.target.textContent = translated;
      e.target.title = 'Click to see original text';
      e.target.style.backgroundColor = 'rgba(66, 133, 244, 0.15)';
      e.target.style.borderBottomColor = '#4285f4';
    }
  }
});

// Show notification (optional visual feedback)
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `inline-translator-notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Listen for double-click on translated text to remove translation
document.addEventListener('dblclick', (e) => {
  if (e.target.classList.contains('inline-translated')) {
    e.preventDefault();
    const original = e.target.dataset.original;
    const textNode = document.createTextNode(original);
    e.target.parentNode.replaceChild(textNode, e.target);
  }
});
