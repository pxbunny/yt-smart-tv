<script lang="ts">
  import GuideButton from './guide-button.svelte';
  import Icon from './icon.svelte';

  type Props = {
    id?: string;
    mini?: boolean;
    onclick?: () => void;
  };

  let props: Props = $props();
</script>

<GuideButton {...props} label="Smart TV">
  <Icon width="24" height="24" />
</GuideButton>
