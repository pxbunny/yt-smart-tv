<script lang="ts">
  import IoTvOutlineIcon from './io-tv-outline-icon.svelte';

  export let id: string | undefined = undefined;
  export let onClick: (() => void) | undefined = undefined;
</script>

<button
  id={id}
  class="ytp-button"
  on:click={onClick}
  data-tooltip-target-id="smart-tv-button"
  data-title-no-tooltip="Smart TV"
  aria-label="Smart TV"
  title="Smart TV"
>
  <IoTvOutlineIcon width="24" height="24" />
</button>
