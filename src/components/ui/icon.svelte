<script lang="ts">
  import ExtensionIcon from '~/components/icons/extension.svelte';
  import ExternalLinkIcon from '~/components/icons/external-link.svelte';
  import Settings from '~/components/icons/settings.svelte';

  type Props = {
    type: 'extension' | 'external-link' | 'settings';
    width?: string | number | null;
    height?: string | number | null;
    color?: string | null;
  };

  let { type, ...iconProps }: Props = $props();
</script>

{#if type === 'extension'}
  <ExtensionIcon {...iconProps} />
{:else if type === 'external-link'}
  <ExternalLinkIcon {...iconProps} />
{:else if type === 'settings'}
  <Settings {...iconProps} />
{/if}
