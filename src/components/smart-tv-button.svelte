<script lang="ts">
  import GuideButton from './guide-button.svelte';
  import IoTvOutlineIcon from './io-tv-outline-icon.svelte';

  export let id: string | undefined = undefined;
  export let mini = false;
  export let onClick: (() => void) | undefined = undefined;
</script>

<GuideButton id={id} mini={mini} onClick={onClick} label="Smart TV">
  <IoTvOutlineIcon width="24" height="24" />
</GuideButton>
