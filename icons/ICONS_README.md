# Icons

This directory should contain the extension icons in the following sizes:

- `icon16.png` - 16x16 pixels (toolbar icon)
- `icon48.png` - 48x48 pixels (extension management page)
- `icon128.png` - 128x128 pixels (Chrome Web Store)

## Creating Icons

You can create icons using the SVG template below or use any icon design tool:

### SVG Template (use an online converter to create PNG files)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <!-- Background Circle -->
  <circle cx="64" cy="64" r="60" fill="#667eea"/>

  <!-- Globe Icon -->
  <circle cx="64" cy="64" r="35" fill="none" stroke="white" stroke-width="3"/>
  <line x1="64" y1="29" x2="64" y2="99" stroke="white" stroke-width="3"/>
  <line x1="29" y1="64" x2="99" y2="64" stroke="white" stroke-width="3"/>
  <ellipse cx="64" cy="64" rx="15" ry="35" fill="none" stroke="white" stroke-width="2"/>
  <path d="M 40 50 Q 64 45 88 50" fill="none" stroke="white" stroke-width="2"/>
  <path d="M 40 78 Q 64 83 88 78" fill="none" stroke="white" stroke-width="2"/>

  <!-- Translation Arrows -->
  <path d="M 50 45 L 45 40 L 50 35" fill="none" stroke="#FFD700" stroke-width="2"/>
  <path d="M 78 83 L 83 88 L 78 93" fill="none" stroke="#FFD700" stroke-width="2"/>
</svg>
```

### Recommended Tools

- [Figma](https://www.figma.com/) - Free design tool
- [GIMP](https://www.gimp.org/) - Free image editor
- [Inkscape](https://inkscape.org/) - Free vector graphics editor
- [CloudConvert](https://cloudconvert.com/svg-to-png) - SVG to PNG converter
- [Canva](https://www.canva.com/) - Easy online design tool

### Design Guidelines

- Use a globe or translation-related icon
- Primary color: #667eea (purple/blue)
- Keep it simple and recognizable at small sizes
- Ensure good contrast for visibility
- Test at all three sizes (16x16, 48x48, 128x128)

## Temporary Solution

For development/testing purposes, you can:
1. Create simple colored squares with text
2. Use placeholder images
3. Or continue without icons (Chrome will use a default icon)

The extension will work without custom icons, but adding them improves the user experience.
