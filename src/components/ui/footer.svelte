<script lang="ts">
  import { getExtensionVersion } from '~/utils/manifest';

  const version = getExtensionVersion();
</script>

<footer class="footer">
  <nav class="links" aria-label="Project links">
    <a
      href="https://github.com/pxbunny/yt-smart-tv"
      target="_blank"
      rel="noreferrer"
    >
      Source code
    </a>
    <span class="sep" aria-hidden="true">·</span>
    <a
      href="https://github.com/pxbunny/yt-smart-tv/issues/new?template=bug_report.md"
      target="_blank"
      rel="noreferrer"
    >
      Report bug
    </a>
    <span class="sep" aria-hidden="true">·</span>
    <a
      href="https://github.com/pxbunny/yt-smart-tv/issues/new?template=feature_request.md"
      target="_blank"
      rel="noreferrer"
    >
      Feature request
    </a>
  </nav>
  <span class="version">v{version}</span>
</footer>

<style lang="scss">
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    justify-content: center;
    color: var(--ytstv-muted);
    font-size: 12px;
    letter-spacing: 0.02em;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
    line-height: 1.2;
  }

  a {
    color: var(--ytstv-muted);

    &:hover {
      color: var(--ytstv-fg);
    }

    &:focus-visible {
      outline: 2px solid var(--ytstv-accent);
      outline-offset: 2px;
      border-radius: 6px;
    }
  }

  .sep {
    opacity: 0.8;
    pointer-events: none;
  }
</style>
