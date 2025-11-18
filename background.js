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

// Translate text using Google Translate (primary) with MyMemory fallback
async function translateText(text, targetLang) {
  // Try Google Translate first
  let result = await translateWithGoogle(text, targetLang);

  // If Google fails, try MyMemory as fallback
  if (!result.success) {
    console.log('Google Translate failed, trying MyMemory...');
    result = await translateWithMyMemory(text, targetLang);
  }

  return result;
}

// Translate using MyMemory API
async function translateWithMyMemory(text, targetLang) {
  try {
    const sourceLang = 'auto';
    const url = new URL(MYMEMORY_API);
    url.searchParams.append('q', text);
    url.searchParams.append('langpair', `${sourceLang}|${targetLang}`);

    console.log('MyMemory API request:', url.toString());

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('MyMemory API response:', data);

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return {
        success: true,
        translatedText: data.responseData.translatedText,
        detectedLanguage: data.responseData.detectedLanguage || null
      };
    } else {
      throw new Error(`MyMemory error: ${data.responseDetails || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('MyMemory translation error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Google Translate (unofficial endpoint - primary translation method)
async function translateWithGoogle(text, targetLang) {
  try {
    const sourceLang = 'auto';
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    console.log('Google Translate request:', url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google API failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Google Translate response:', data);

    // Google Translate returns an array structure
    if (data && data[0] && data[0][0] && data[0][0][0]) {
      // Combine all translation segments
      let translatedText = '';
      for (let i = 0; i < data[0].length; i++) {
        if (data[0][i][0]) {
          translatedText += data[0][i][0];
        }
      }

      return {
        success: true,
        translatedText: translatedText.trim()
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
