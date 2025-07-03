<script lang="ts">
  import TvPlayerIcon from './tv-player-icon.svelte';

  type Props = {
    id?: string;
    onclick?: () => void;
  };

  let props: Props = $props();

  const { id } = props;
  const title = 'Smart TV';
</script>

<button
  {...props}
  class="ytp-button"
  data-tooltip-target-id={id}
  data-title-no-tooltip={title}
  aria-label={title}
  title={title}
>
  <TvPlayerIcon />
</button>
