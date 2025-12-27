<script lang="ts">
  import ExtensionIcon from '~/components/icons/extension.svelte';
  import GuideButton from './guide-button.svelte';

  type Props = {
    id?: string;
    mini?: boolean;
    onclick?: () => void;
  };

  let props: Props = $props();
</script>

<GuideButton {...props} label="Smart TV">
  <ExtensionIcon width="24" height="24" />
</GuideButton>
