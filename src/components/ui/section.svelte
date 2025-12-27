<script lang="ts">
  import { type Snippet } from 'svelte';

  type Props = {
    title?: string;
    children?: Snippet;
  };

  let { title, children }: Props = $props();
</script>

<section class="section">
  {#if title}
    <h2 class="title">{title}</h2>
  {/if}
  <div class="grid">
    {@render children?.()}
  </div>
</section>

<style lang="scss">
  .section {
    display: grid;
    gap: 8px;
  }

  .title {
    margin: 0;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--ytstv-muted);
  }

  .grid {
    display: grid;
    gap: 12px;
  }
</style>
