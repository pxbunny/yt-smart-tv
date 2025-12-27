<script lang="ts">
  import ExtensionIcon from '~/components/icons/extension.svelte';

  type Props = {
    title?: string;
    subtitle?: string;
  };

  let { title = getExtensionName(), subtitle }: Props = $props();
</script>

<header class="header">
  <div class="logo">
    <ExtensionIcon width="28" height="28" color="#FF0000" />
    <h1 class="title">{title}</h1>
  </div>
  {#if subtitle}
    <p class="subtitle">{subtitle}</p>
  {/if}
</header>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .subtitle {
    font-size: 12px;
    font-weight: 700;
    color: var(--ytstv-muted);
    text-transform: uppercase;
  }

  .title {
    font-size: 24px;
    font-weight: 700;
  }
</style>
