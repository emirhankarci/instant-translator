# Inline Translator Chrome Extension

Instantly translate selected text directly on any webpage with automatic inline replacement.

## Features

- **Instant Translation**: Select any text on a webpage and it automatically translates
- **Inline Replacement**: Translated text replaces the original text directly on the page
- **Toggle Feature**: Click on translated text to see the original
- **Double-click to Remove**: Double-click to permanently remove the translation
- **Customizable Settings**: Choose your target language and minimum character count
- **26 Languages Supported**: English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Arabic, Hindi, and more
- **Clean UI**: No popups or context menus - seamless integration with any website

## Installation

### From Source (Developer Mode)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the `inline-translator` directory
6. The extension is now installed!

### From Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store soon.

## How to Use

1. **Select Text**: Highlight any text on a webpage (minimum 3 characters by default)
2. **Automatic Translation**: The text will automatically translate to your target language
3. **View Original**: Click on the translated text to toggle back to the original
4. **Remove Translation**: Double-click to permanently remove the translation and restore original text
5. **Change Settings**: Click the extension icon to change target language and other settings

## Settings

- **Target Language**: Choose which language to translate text into (default: English)
- **Minimum Characters**: Set the minimum number of characters required for translation (default: 3)

## Technical Details

### Project Structure

```
inline-translator/
├── manifest.json          # Extension configuration (Manifest V3)
├── content.js             # Script running on the page
├── background.js          # Service worker (API requests)
├── popup/
│   ├── popup.html         # Extension settings UI
│   ├── popup.js           # Settings logic
│   └── popup.css          # Settings styles
├── styles/
│   └── content.css        # Translated text styles
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

### Translation API

This extension uses the **MyMemory Translation API** for translations:
- Free tier available
- Supports automatic language detection
- No API key required for basic usage
- Daily usage limits apply

## Privacy

- No data is collected or stored by this extension
- Translations are sent to MyMemory API (see their privacy policy)
- Settings are stored locally using Chrome's storage API
- No tracking or analytics

## Browser Compatibility

- Chrome (Manifest V3)
- Edge (Chromium-based)
- Brave
- Opera
- Other Chromium-based browsers

## Development

### Building from Source

```bash
# Clone the repository
git clone <repository-url>
cd inline-translator

# No build step required - pure JavaScript
# Just load the extension in Chrome Developer Mode
```

### Future Enhancements

- [ ] Keyboard shortcut support (e.g., Ctrl+T to translate)
- [ ] Translation history
- [ ] Multiple translation API support (Google, DeepL, LibreTranslate)
- [ ] Site-based whitelist/blacklist
- [ ] Custom styling options
- [ ] Translation quality indicator
- [ ] Offline dictionary support

## Troubleshooting

**Translation not working?**
- Check your internet connection
- Make sure you selected at least the minimum number of characters
- Avoid selecting text in input fields or textareas
- Check the browser console for errors

**Settings not saving?**
- Make sure Chrome sync is enabled
- Try reloading the extension

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

- Translation API: MyMemory (https://mymemory.translated.net/)
- Icons: (Add your icon source here)

## Version History

### 1.0.0 (Initial Release)
- Basic text selection and translation
- Inline text replacement
- Toggle between original and translated text
- Settings UI with language selection
- Support for 26 languages
- Double-click to remove translation

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

Made with ❤️ for language learners and international users
