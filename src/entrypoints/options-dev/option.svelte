<script lang="ts">
  import { type Snippet } from 'svelte';

  import Switch from '~/components/switch.svelte';

  type Props = {
    title: string;
    description?: string;
    checked?: boolean;
    disabled?: boolean;
    children?: Snippet;
  };

  let {
    title,
    description,
    checked = $bindable(false),
    disabled = false,
    children
  }: Props = $props();
</script>

<div class="option">
  <div class="text">
    <div class="title">{title}</div>
    {#if description}
      <div class="description">{description}</div>
    {/if}
    {@render children?.()}
  </div>
  <div class="control">
    <Switch bind:checked {disabled} ariaLabel={title} />
  </div>
</div>

<style lang="scss">
  .option {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border: 1px solid var(--ytstv-border);
    border-radius: 12px;
    background: var(--ytstv-surface);
    transition:
      background-color var(--ytstv-transition-duration) ease-in-out,
      border-color var(--ytstv-transition-duration) ease-in-out,
      transform var(--ytstv-transition-duration) ease-in-out,
      box-shadow var(--ytstv-transition-duration) ease-in-out;
  }

  .option:hover {
    background: var(--ytstv-surface-hover);
  }

  .option:focus-within {
    border-color: var(--ytstv-accent);
    box-shadow: 0 0 0 2px var(--ytstv-accent);
  }

  .text {
    display: grid;
    gap: 4px;
  }

  .title {
    font-weight: 600;
  }

  .description {
    color: var(--ytstv-muted);
    font-size: 12px;
  }

  .control {
    display: flex;
    align-items: center;
  }
</style>
