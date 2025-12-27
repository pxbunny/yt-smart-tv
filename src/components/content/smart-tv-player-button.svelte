<script lang="ts">
  import ExtensionIcon from '~/components/icons/extension.svelte';

  type Props = {
    id?: string;
    onclick?: () => void;
  };

  let props: Props = $props();

  const title = 'Smart TV';
</script>

<button
  {...props}
  class="ytp-button"
  title={title}
  aria-label={title}
>
  <ExtensionIcon width="24" height="24" color="white" />
</button>
