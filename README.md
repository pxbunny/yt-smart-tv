<h1 align="center">
  <sub><img src="assets/logo.svg" alt="YouTube Smart TV logo" height="32"></sub>
  YouTube Smart TV - Browser Extension
</h1>

<div align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-GPLv3-blue.svg" alt="License: GPL-3.0" /></a>
  <a href="https://github.com/pxbunny/yt-smart-tv/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/pxbunny/yt-smart-tv/ci.yml?label=Build" alt="CI" /></a>
</div>

<br/>

| Browser | Source | Info |
| :---: | --- | --- |
| <img src="https://github.com/user-attachments/assets/5463ef88-873b-4516-8514-5277664cfde7" alt="Chromium"> | Chrome&nbsp;Web&nbsp;Store | Not published yet |
| <img src="https://github.com/user-attachments/assets/b0136512-56a5-4856-8c50-4971c957a24f" alt="Firefox"> | Firefox&nbsp;Add-ons | Not published yet |
| | Source&nbsp;code | You can always build and install the extension from source — see the instructions in [Installation (from source)](#-installation-from-source). |

A lightweight browser extension that adds an **Open in TV mode** control to YouTube. It integrates with the standard YouTube layout by adding:

- a button in the left navigation menu,
- a button next to the fullscreen control on the player,

so you can quickly switch to the **YouTube TV** UI and control playback from your phone.

---

- ✨ [Features](#-features)
- ✅ [Compatibility](#-compatibility)
- 🚀 [Usage](#-usage)
- 📱 [Link your phone with a TV code](#-link-your-phone-with-a-tv-code)
- 🤫 [Incognito / Private mode](#-incognito--private-mode)
- 📦 [Installation (from source)](#-installation-from-source)
- 🔧 [Development](#-development)

---

## ✨ Features

- One-click switch to **YouTube TV** (`https://www.youtube.com/tv`).
- Buttons integrated into the YouTube interface (sidebar + player controls).
- Player button resumes the current video at the same timestamp in TV mode.
- Options page to customize which buttons are shown and how TV mode opens (window/tab, fullscreen).

## ✅ Compatibility

- Google Chrome
- Mozilla Firefox
- Microsoft Edge, Brave, Vivaldi, and other Chromium-based browsers

## 🚀 Usage

1. Open a regular YouTube page.
2. Click **Smart TV** from the left menu or the TV icon near the fullscreen button.
3. YouTube opens in TV mode (in a new window or tab, depending on your options). Press `Esc` inside TV mode to leave.

> Note: `Esc` closes the Smart TV window/tab only when YouTube shows the exit overlay (the one with buttons like "Exit" / "Back").
> In some cases (especially when you're not logged in), YouTube may show a sign-in screen instead and `Esc` won't work.
> If that happens, exit fullscreen manually and close the Smart TV window/tab yourself.

## 📱 Link your phone with a TV code

You can pair your phone with YouTube running in TV mode and use it as a remote control.

1. Open YouTube TV mode.
2. Go to **Settings > Link TV & Phone > Link with TV code**.
3. Follow the on-screen steps to finish pairing.

> After pairing, you can queue videos, control playback/volume, and browse from your phone while the TV UI plays on your computer.

<p align="center"><img src="assets/screenshot-tv-code.png" alt="TV code" /></p>

## 🤫 Incognito / Private mode

To use the extension from an incognito/private window (and open Smart TV in that mode), you need to enable it in the browser settings.

### Chromium (Incognito)

1. Open [`chrome://extensions`](chrome://extensions).
2. Find **YouTube Smart TV** and open **Details**.
3. Enable **Allow in Incognito**.

### Firefox (Private Windows)

1. Open [`about:addons`](about:addons).
2. Go to **Extensions** -> **YouTube Smart TV**.
3. Set **Run in Private Windows** to **Allow**.

## 📦 Installation (from source)

### Requirements

- **Node.js** 20+
- A compatible browser (see [Compatibility](#-compatibility))

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
   This creates production builds and ZIP packages in:
   - Chromium (production build): `dist/chrome-mv3/`
   - Firefox (production build): `dist/firefox-mv2/`
   - Chromium (ZIP package): `dist/yt-smart-tv-*-chrome.zip`
   - Firefox (ZIP package): `dist/yt-smart-tv-*-firefox.zip`

4. Add the extension to your browser (choose one method):
   <details>
   <summary><strong>Chromium: Load unpacked</strong></summary>

   - Open [`chrome://extensions`](chrome://extensions).
   - Enable **Developer mode** (top-right).
   - Click **Load unpacked** and select the `dist/chrome-mv3/` folder.

   </details>

   <details>
   <summary><strong>Firefox: Load temporary add-on</strong></summary>

   - Open [`about:debugging#/runtime/this-firefox`](about:debugging#/runtime/this-firefox).
   - Click **Load Temporary Add-on...**
   - Select `dist/firefox-mv2/manifest.json`.
   - Note: Temporary add-ons are removed when Firefox is closed/restarted (they are intended for development).

   </details>

   <details>
   <summary><strong>Firefox: Install from ZIP/XPI (persistent)</strong></summary>

   - Find the ZIP package: `dist/yt-smart-tv-*-firefox.zip`.
   - Rename the file from `.zip` to `.xpi`.
   - Open [`about:addons`](about:addons) -> gear icon -> **Install Add-on From File...** -> select the `.xpi`.
   - Note: On stable Firefox, unsigned add-ons may be blocked. For permanent installs, use a signed build (AMO) or Firefox Developer Edition/Nightly (with signing disabled).

   </details>

## 🔧 Development

Run the extension in dev mode:

- Chromium: `npm run dev:chrome`
- Firefox: `npm run dev:firefox`
