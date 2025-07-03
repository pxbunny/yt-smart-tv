<script lang="ts">
  import GuideButton from './guide-button.svelte';
  import IoTvOutlineIcon from './io-tv-outline-icon.svelte';

  type Props = {
    id?: string;
    mini?: boolean;
    onclick?: () => void;
  };

  let { id, mini, onclick }: Props = $props();
</script>

<GuideButton id={id} mini={mini} {onclick} label="Smart TV">
  <IoTvOutlineIcon width="24" height="24" />
</GuideButton>
