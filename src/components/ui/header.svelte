<script lang="ts">
  import ExtensionIcon from '~/components/icons/extension.svelte';

  type Props = {
    title?: string;
    subtitle?: string;
    size?: 'md' | 'sm';
  };

  let { title = getExtensionName(), subtitle, size = 'md' }: Props = $props();
  let iconSize = $derived(size === 'sm' ? 22 : 28);
</script>

<header class="header" class:sm={size === 'sm'}>
  <div class="logo">
    <ExtensionIcon width={iconSize} height={iconSize} color="#FF0000" />
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

    &.sm {
      .logo {
        gap: 10px;
      }

      .title {
        font-size: 20px;
      }
    }
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
