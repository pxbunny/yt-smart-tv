<script lang="ts">
  import TvPlayerIcon from './tv-player-icon.svelte';

  type Props = {
    id?: string;
    onclick?: () => void;
  };

  let { id, onclick }: Props = $props();

  const title = 'Smart TV';
</script>

<button
  id={id}
  class="ytp-button"
  data-tooltip-target-id={id}
  data-title-no-tooltip={title}
  aria-label={title}
  title={title}
  {onclick}
>
  <TvPlayerIcon />
</button>
