// Inline Translator - Background Service Worker
// Handles translation API requests

// MyMemory API endpoint (free tier)
const MYMEMORY_API = 'https://api.mymemory.translated.net/get';

// Listen for translation requests from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'translate') {
    translateText(request.text, request.targetLang)
      .then(result => sendResponse(result))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep channel open for async response
  }
});

// Translate text using MyMemory API
async function translateText(text, targetLang) {
  try {
    // Detect source language automatically (use 'auto' or specific language)
    const sourceLang = 'auto';

    // Build API URL
    const url = new URL(MYMEMORY_API);
    url.searchParams.append('q', text);
    url.searchParams.append('langpair', `${sourceLang}|${targetLang}`);

    // Make API request
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Check if translation was successful
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return {
        success: true,
        translatedText: data.responseData.translatedText,
        detectedLanguage: data.responseData.detectedLanguage || null
      };
    } else {
      throw new Error('Translation failed or returned empty result');
    }
  } catch (error) {
    console.error('Translation error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Alternative: Google Translate (unofficial endpoint - use with caution)
async function translateWithGoogle(text, targetLang) {
  try {
    const sourceLang = 'auto';
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data && data[0] && data[0][0] && data[0][0][0]) {
      return {
        success: true,
        translatedText: data[0][0][0]
      };
    } else {
      throw new Error('Invalid response from Google Translate');
    }
  } catch (error) {
    console.error('Google Translate error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Installation handler - set default settings
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default settings
    chrome.storage.sync.set({
      targetLanguage: 'en',
      minCharacters: 3,
      apiProvider: 'mymemory'
    });

    console.log('Inline Translator installed successfully!');
  } else if (details.reason === 'update') {
    console.log('Inline Translator updated to version', chrome.runtime.getManifest().version);
  }
});
