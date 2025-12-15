<p align="center">
  <img src="assets/logo.svg" alt="YouTube Smart TV logo" width="128" />
</p>

<h1 align="center">YouTube Smart TV Browser Extension</h1>

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-GPLv3-blue.svg" alt="License: GPL-3.0" />
  </a>
</p>

A lightweight browser extension that adds an **Open in TV mode** control to YouTube. It integrates with the standard YouTube layout by adding:

- a button in the left navigation menu
- a button next to the fullscreen control on the player

so you can quickly switch to the **YouTube TV** UI and control playback from your phone.

## ✨ Features

- One-click switch to **YouTube TV** (`https://www.youtube.com/tv`).
- Buttons integrated into the YouTube interface (sidebar + player controls).
- Player button resumes the current video at the same timestamp in TV mode.
- Works entirely client-side; no data leaves your browser.
- Designed for Chromium-based browsers.

## 📦 Installation (from source)

### Requirements

- **Node.js** 18+ and **npm** 9+
- A Chromium-based browser (Chrome, Edge, Brave, Vivaldi, etc.)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/pxbunny/yt-smart-tv.git
   cd yt-smart-tv
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```
   This creates a production build in the `dist/` folder.

4. Load unpacked:
   - Open `chrome://extensions`.
   - Enable **Developer mode** (top-right).
   - Click **Load unpacked** and select the `dist/` folder.

## ▶️ Usage

1. Open a regular YouTube page.
2. Click **Smart TV** from the left menu or the TV icon near the fullscreen button.
3. YouTube opens in TV mode in a new window. Press `Esc` inside TV mode to leave.

## 📱 Link your phone with a TV code

You can pair your phone with YouTube running in TV mode and use it as a remote control.

1. Open YouTube TV mode.
2. Go to **Settings > Watch on TV > Enter TV code**.
3. Follow the on-screen steps to finish pairing.

> After pairing, you can queue videos, control playback/volume, and browse from your phone while the TV UI plays on your computer.

## ✅ Compatibility

- Google Chrome
- Microsoft Edge, Brave, Vivaldi, and other Chromium-based browsers

## 🔒 Privacy & permissions

- The extension does not collect, store, or transmit personal data.
- All functionality runs locally in your browser.
- Uses minimal permissions required to inject the UI controls and apply a User-Agent override for `youtube.com/tv` (via `declarativeNetRequest`).
