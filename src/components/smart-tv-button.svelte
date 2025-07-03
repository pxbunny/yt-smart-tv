<script lang="ts">
  import GuideButton from './guide-button.svelte';
  import IoTvOutlineIcon from './io-tv-outline-icon.svelte';

  type Props = {
    id?: string;
    mini?: boolean;
    onclick?: () => void;
  };

  let props: Props = $props();
</script>

<GuideButton {...props} label="Smart TV">
  <IoTvOutlineIcon width="24" height="24" />
</GuideButton>
