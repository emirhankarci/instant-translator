// Inline Translator - Popup Script
// Handles settings UI and storage

document.addEventListener('DOMContentLoaded', () => {
  const targetLanguageSelect = document.getElementById('targetLanguage');
  const minCharactersInput = document.getElementById('minCharacters');
  const saveBtn = document.getElementById('saveBtn');
  const statusMessage = document.getElementById('statusMessage');

  // Load saved settings
  loadSettings();

  // Save button click handler
  saveBtn.addEventListener('click', saveSettings);

  // Allow Enter key to save
  document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      saveSettings();
    }
  });

  // Load settings from Chrome storage
  function loadSettings() {
    chrome.storage.sync.get(['targetLanguage', 'minCharacters'], (result) => {
      if (result.targetLanguage) {
        targetLanguageSelect.value = result.targetLanguage;
      }
      if (result.minCharacters !== undefined) {
        minCharactersInput.value = result.minCharacters;
      }
    });
  }

  // Save settings to Chrome storage
  function saveSettings() {
    const targetLanguage = targetLanguageSelect.value;
    const minCharacters = parseInt(minCharactersInput.value, 10);

    // Validate input
    if (minCharacters < 1 || minCharacters > 50) {
      showStatus('Minimum characters must be between 1 and 50', 'error');
      return;
    }

    // Save to Chrome storage
    chrome.storage.sync.set(
      {
        targetLanguage: targetLanguage,
        minCharacters: minCharacters
      },
      () => {
        if (chrome.runtime.lastError) {
          showStatus('Error saving settings', 'error');
          console.error('Save error:', chrome.runtime.lastError);
        } else {
          showStatus('Settings saved successfully!', 'success');

          // Auto-hide success message after 2 seconds
          setTimeout(() => {
            hideStatus();
          }, 2000);
        }
      }
    );
  }

  // Show status message
  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message show ${type}`;
  }

  // Hide status message
  function hideStatus() {
    statusMessage.classList.remove('show');
  }
});
