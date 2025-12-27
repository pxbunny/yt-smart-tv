<script lang="ts">
  import { getExtensionVersion } from '~/utils/manifest';

  const version = getExtensionVersion();
</script>

<footer class="footer">
  <span class="version">v{version}</span>
</footer>

<style lang="scss">
  .footer {
    display: flex;
    justify-content: center;
    color: var(--ytstv-muted);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
</style>

