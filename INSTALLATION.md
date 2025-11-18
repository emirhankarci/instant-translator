# Installation Guide

## For Users

### Method 1: Load Unpacked (Developer Mode)

1. **Download the Extension**
   - Download the extension files from GitHub
   - Extract the ZIP file to a folder on your computer

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Or click the three dots menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner
   - This enables the "Load unpacked" button

4. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to the `inline-translator` folder
   - Select the folder and click "Select Folder" (or "Open")

5. **Verify Installation**
   - You should see "Inline Translator" in your extensions list
   - The extension icon will appear in your toolbar
   - Make sure it's enabled (toggle should be blue)

6. **Configure Settings**
   - Click the extension icon in the toolbar
   - Select your preferred target language
   - Adjust minimum character count if desired
   - Click "Save Settings"

7. **Start Using**
   - Go to any webpage
   - Select any text (at least 3 characters)
   - Watch it translate automatically!

### Method 2: Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store in the future. Installation will be as simple as:
1. Visit the extension's Chrome Web Store page
2. Click "Add to Chrome"
3. Confirm by clicking "Add extension"

## For Developers

### Prerequisites

- Google Chrome (version 88 or higher)
- Basic understanding of Chrome extensions
- Text editor or IDE

### Development Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd inline-translator
   ```

2. **Review Project Structure**
   ```
   inline-translator/
   ├── manifest.json      # Extension manifest
   ├── content.js         # Content script
   ├── background.js      # Service worker
   ├── popup/             # Settings UI
   ├── styles/            # CSS files
   └── icons/             # Extension icons
   ```

3. **Add Icons (Optional)**
   - Create or download icon images (16x16, 48x48, 128x128)
   - Place them in the `icons/` directory
   - See `icons/ICONS_README.md` for guidelines

4. **Load in Chrome**
   - Follow the "Load Unpacked" instructions above
   - The extension will reload automatically when you make changes to the code
   - Click the refresh icon on the extension card after making changes

5. **Debugging**
   - **Content Script**: Right-click on webpage → Inspect → Console tab
   - **Background Script**: chrome://extensions/ → Click "Service Worker" link
   - **Popup**: Right-click on extension icon → Inspect popup

### Testing

1. **Basic Functionality**
   - Visit any webpage (e.g., Wikipedia)
   - Select some text
   - Verify translation appears inline
   - Click translated text to toggle
   - Double-click to remove translation

2. **Settings**
   - Click extension icon
   - Change target language
   - Change minimum characters
   - Verify settings persist after closing popup

3. **Edge Cases**
   - Try selecting text in input fields (should not translate)
   - Try selecting very short text (should respect minimum)
   - Try on different websites (complex layouts, SPAs, etc.)

### Common Development Issues

**Extension not loading?**
- Check for syntax errors in JavaScript files
- Verify manifest.json is valid JSON
- Look for errors in chrome://extensions/

**Translations not working?**
- Check browser console for errors
- Verify internet connection
- Test the API endpoint directly
- Check background service worker logs

**Changes not applying?**
- Click the refresh icon on the extension in chrome://extensions/
- For manifest changes, you may need to remove and reload the extension
- Hard refresh the webpage (Ctrl+Shift+R or Cmd+Shift+R)

### Making Changes

1. Edit the relevant file:
   - `content.js` - Text selection and replacement logic
   - `background.js` - Translation API calls
   - `popup/*` - Settings UI
   - `styles/content.css` - Visual styling

2. Save your changes

3. Reload the extension:
   - Go to chrome://extensions/
   - Click the refresh icon on the "Inline Translator" card

4. Refresh any open webpages where you're testing

5. Test your changes

### Publishing to Chrome Web Store

1. **Prepare for Submission**
   - Create high-quality icons
   - Add screenshots of the extension in action
   - Write a detailed description
   - Set up a privacy policy (if needed)
   - Create promotional images (440x280, 920x680, 1400x560)

2. **Create ZIP File**
   ```bash
   # From the project directory
   zip -r inline-translator.zip . -x "*.git*" "*.DS_Store" "node_modules/*"
   ```

3. **Submit to Chrome Web Store**
   - Register as a Chrome Web Store developer ($5 one-time fee)
   - Visit [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
   - Click "New Item"
   - Upload the ZIP file
   - Fill in the listing details
   - Submit for review

4. **Review Process**
   - Initial review typically takes 1-3 business days
   - Address any issues raised by reviewers
   - Once approved, the extension goes live

## Troubleshooting

### For Users

**Extension not appearing in toolbar?**
- Click the puzzle piece icon in Chrome toolbar
- Find "Inline Translator" and click the pin icon

**Translations seem slow?**
- This is normal - depends on your internet speed
- The free API may have rate limits
- Try translating shorter text selections

**Settings not saving?**
- Make sure Chrome sync is enabled in Chrome settings
- Check that the extension has storage permissions

### For Developers

**Service worker inactive?**
- This is normal - it activates when needed
- Click the "Service worker" link to wake it up
- Check for errors in the service worker console

**Content script not injecting?**
- Verify `matches` pattern in manifest.json
- Check if the website has a restrictive CSP
- Look for errors in the page console

## Need Help?

- Check the [README.md](README.md) for feature documentation
- Review the source code comments
- Open an issue on GitHub
- Check Chrome extension development documentation

## Next Steps

After installation:
1. Read the [README.md](README.md) for usage instructions
2. Try the extension on different websites
3. Customize settings to your preference
4. Report any bugs or suggest features

---

Happy translating! 🌍
