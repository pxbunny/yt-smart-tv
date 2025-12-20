<script lang="ts">
  import Icon from '~/components/icon.svelte';

  type Props = {
    title?: string;
  };

  let { title = 'YouTube Smart TV' }: Props = $props();
</script>

<header class="header">
  <Icon width="28" height="28" color="#FF0000" />
  <h1 class="title">{title}</h1>
</header>

<style lang="scss">
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  .title {
    font-size: 24px;
    font-weight: 700;
  }
</style>
