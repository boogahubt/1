Ableton 12 Theme Creator – GUI Editor & Smart Theme Engine
===========================================================

This project provides a basic web-based prototype for editing Ableton 12 themes.
It mimics the Arrange view with three regions (header, arrange area, and footer).
Hover a region to highlight it. Clicking opens a palette where you can adjust
colour and brightness. Theme settings can be imported/exported as JSON.

Quick start
-----------
1. Open `src/index.html` in a browser.
2. Click on any region to edit its colour.
3. Use the toolbar to import/export theme files or generate a palette from an
   image.

Theme file format
-----------------
`theme.json` looks like this:
```json
{
  "header": "#2b2b2b",
  "arrange": "#444444",
  "footer": "#2b2b2b"
}
```

Limitations
-----------
This demo does not include official Ableton assets. It offers a simplified
workflow that can be expanded with real screenshots or UI elements.
