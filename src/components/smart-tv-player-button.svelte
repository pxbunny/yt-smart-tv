<script lang="ts">
  import IoTvOutlineIcon from './io-tv-outline-icon.svelte';

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
  <IoTvOutlineIcon width="24" height="24" />
</button>
