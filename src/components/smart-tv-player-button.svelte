<script lang="ts">
  import Icon from './icon.svelte';

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
  <Icon width="24" height="24" color="white" />
</button>
