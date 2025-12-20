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

<label class="option" class:disabled>
  <div class="text">
    <div class="title">{title}</div>
    {#if description}
      <div class="description">{description}</div>
    {/if}
    {@render children?.()}
  </div>
  <div class="control">
    <Switch bind:checked {disabled} />
  </div>
</label>

<style lang="scss">
  .option {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border: 1px solid var(--ytstv-border);
    border-radius: 12px;
    background: var(--ytstv-surface);
    cursor: pointer;
    transition:
      background-color var(--ytstv-transition-duration) ease-in-out,
      border-color var(--ytstv-transition-duration) ease-in-out,
      transform var(--ytstv-transition-duration) ease-in-out,
      box-shadow var(--ytstv-transition-duration) ease-in-out;

    &:not(.disabled):hover {
      background: var(--ytstv-surface-hover);
    }

    &.disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:focus-within {
      border-color: var(--ytstv-accent);
      box-shadow: 0 0 0 2px var(--ytstv-accent);
    }

    @supports selector(.option:has(:focus-visible)) {
      &:focus-within {
        border-color: var(--ytstv-border);
        box-shadow: none;
      }
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
  }
</style>
