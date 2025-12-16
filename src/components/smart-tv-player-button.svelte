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
  type="button"
  class="ytp-button"
  aria-label={title}
  title={title}
>
  <Icon width="24" height="24" color="white" />
</button>
