<h1 align="center">
  <sub><img src="assets/logo.svg" alt="YouTube Smart TV logo" height="32"></sub>
  YouTube Smart TV - Browser Extension
</h1>

<div align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-GPLv3-blue.svg" alt="License: GPL-3.0" /></a>
  <a href="https://github.com/pxbunny/yt-smart-tv/releases"><img src="https://img.shields.io/github/v/release/pxbunny/yt-smart-tv?label=Release" alt="Release" /></a>
  <a href="https://github.com/pxbunny/yt-smart-tv/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/pxbunny/yt-smart-tv/ci.yml?label=Build" alt="CI" /></a>
</div>

<br/>

<table>
  <tr>
    <td align="center">
      <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/chrome/chrome_48x48.png" alt="Chromium" />
    </td>
    <td>Chrome&nbsp;Web&nbsp;Store</td>
    <td>Not published yet</td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/firefox/firefox_48x48.png" alt="Firefox" />
    </td>
    <td>Firefox&nbsp;Add-ons</td>
    <td>Not published yet</td>
  </tr>
  <tr>
    <td align="center">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="assets/github-mark-white.svg" width="48" />
        <source media="(prefers-color-scheme: light)" srcset="assets/github-mark.svg" width="48" />
        <img src="assets/github-mark.svg" width="48" />
      </picture>
    </td>
    <td><a href="https://github.com/pxbunny/yt-smart-tv/releases">Releases</a></td>
    <td>
      Download a pre-built package. See <a href="#-installation-from-release">Installation (from release)</a>.
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/75.0.1/node.js/node.js_48x48.png" alt="Source code" />
    </td>
    <td>Source&nbsp;code</td>
    <td>
      You can always build and install the extension from source — see the instructions
      in <a href="#-installation-from-source">Installation (from source)</a>.
    </td>
  </tr>
</table>

> A lightweight browser extension that adds **Smart TV** controls to YouTube. It integrates with the standard layout
> by inserting buttons into the **left sidebar** and **player controls** (next to the fullscreen button),
> so you can open **YouTube TV** with one click and control playback from your phone after pairing (TV code).

- ✨ [Features](#-features)
- ✅ [Compatibility](#-compatibility)
- 🚀 [Usage](#-usage)
- 📱 [Link your phone with a TV code](#-link-your-phone-with-a-tv-code)
- 🤫 [Incognito / Private mode](#-incognito--private-mode)
- 📦 [Installation (from release)](#-installation-from-release)
- 📦 [Installation (from source)](#-installation-from-source)
- 🔧 [Development](#-development)

---

## ✨ Features

- One-click switch to **YouTube TV** (`https://www.youtube.com/tv`).
- Buttons integrated into the YouTube interface (sidebar + player controls).
- Player button opens TV mode **at the same video and timestamp**.
- Options page to customize which buttons are shown and how TV mode opens (window/tab, fullscreen).

## ✅ Compatibility

- Google Chrome
- Mozilla Firefox
- Microsoft Edge, Brave, Vivaldi, and other Chromium-based browsers

## 🚀 Usage

1. Open a regular YouTube page.
2. Click **Smart TV** in the left menu or the TV icon near the fullscreen button.
3. YouTube opens in TV mode (in a new tab or window, depending on your options). Press `Esc` inside TV mode to leave.

> **Note:** `Esc` closes the Smart TV window/tab only when YouTube shows the exit overlay (the one with buttons like "Exit" / "Back").
> In some cases (especially when you're not logged in), YouTube may show a sign-in screen instead and `Esc` won't work.
> If that happens, exit fullscreen manually and close the Smart TV window/tab yourself.

## 📱 Link your phone with a TV code

You can pair your phone with YouTube running in TV mode and use it as a remote control.

1. Open YouTube in TV mode.
2. Go to **Settings → Link TV & phone → Link with TV code**.
3. Follow the on-screen steps to finish pairing.

> After pairing, you can queue videos, control playback/volume, and browse from your phone while the TV UI plays on your computer.

<p align="center"><img src="assets/screenshot-tv-code.png" alt="TV code" /></p>

## 🤫 Incognito / Private mode

To use the extension from an incognito/private window (and open Smart TV in that mode), you need to enable it in the browser settings.

### Chromium (Incognito)

1. Open `chrome://extensions`.
2. Find **YouTube Smart TV** → **Details**.
3. Enable **Allow in Incognito**.

### Firefox (Private Windows)

1. Open `about:addons`.
2. Go to **Extensions** → **YouTube Smart TV**.
3. Set **Run in Private Windows** to **Allow**.

## 📦 Installation (from release)

1. Go to [Releases](https://github.com/pxbunny/yt-smart-tv/releases) and open the latest one.
2. Download the ZIP package for your browser:
   - Chromium: `yt-smart-tv-*-chrome.zip`
   - Firefox: `yt-smart-tv-*-firefox.zip`
3. Add the extension to your browser:

   <details>
   <summary><strong>Chromium</strong></summary>

   - Unzip `yt-smart-tv-*-chrome.zip`.
   - Open `chrome://extensions`.
   - Enable **Developer mode** (top-right).
   - Click **Load unpacked** and select the extracted folder.

   </details>

   <details>
   <summary><strong>Firefox</strong></summary>

   - Rename the file from `.zip` to `.xpi`.
   - Open [`about:addons`](about:addons) -> gear icon -> **Install Add-on From File...** -> select the `.xpi`.
   - **Note:** On stable Firefox, unsigned add-ons may be blocked. For permanent installs, use a signed build (AMO) or Firefox Developer Edition/Nightly (with signing disabled).

   </details>

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
   - **Note:** Temporary add-ons are removed when Firefox is closed/restarted (they are intended for development).

   </details>

   <details>
   <summary><strong>Firefox: Install from ZIP/XPI (persistent)</strong></summary>

   - Find the ZIP package: `dist/yt-smart-tv-*-firefox.zip`.
   - Rename the file from `.zip` to `.xpi`.
   - Open [`about:addons`](about:addons) -> gear icon -> **Install Add-on From File...** -> select the `.xpi`.
   - **Note:** On stable Firefox, unsigned add-ons may be blocked. For permanent installs, use a signed build (AMO) or Firefox Developer Edition/Nightly (with signing disabled).

   </details>

## 🔧 Development

Run the extension in dev mode:

- Chromium: `npm run dev:chrome`
- Firefox: `npm run dev:firefox`
