<script lang="ts">
  import TvPlayerIcon from './tv-player-icon.svelte';

  export let id: string | undefined = undefined;
  export let onClick: (() => void) | undefined = undefined;

  const title = 'Smart TV';
</script>

<button
  id={id}
  class="ytp-button"
  data-tooltip-target-id="smart-tv-button"
  data-title-no-tooltip={title}
  aria-label={title}
  title={title}
  on:click={onClick}
>
  <TvPlayerIcon />
</button>
