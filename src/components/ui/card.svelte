<script lang="ts">
  import { type Snippet } from 'svelte';

  import Icon from './icon.svelte';
  import Switch from './switch.svelte';

  type IconType = 'external-link' | 'settings';

  type Props = {
    title: string;
    description?: string;
    disabled?: boolean;
    children?: Snippet;
  } & (
    | { type: 'switch'; checked?: boolean; onclick?: never; icon?: never; }
    | { type: 'button'; onclick: () => void; checked?: never; icon?: IconType; }
  );

  let {
    title,
    description,
    children,
    disabled = false,
    type,
    checked = $bindable(false),
    onclick,
    icon
  }: Props = $props();
</script>

{#snippet content(title: string, description?: string, children?: Snippet)}
  <div class="content">
    <div class="title">{title}</div>
    {#if description}
      <div class="description">{description}</div>
    {/if}
    {@render children?.()}
  </div>
{/snippet}

{#if type === 'switch'}
  <label class="card" class:disabled>
    {@render content?.(title, description, children)}
    <div class="actions">
      <Switch bind:checked disabled={disabled} />
    </div>
  </label>
{:else if type === 'button'}
  <button class="card" class:disabled {onclick}>
    {@render content?.(title, description, children)}
    {#if icon}
      <div class="actions">
        <Icon type={icon} width="16" height="16" />
      </div>
    {/if}
  </button>
{/if}

<style lang="scss">
  .card {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border: 1px solid var(--ytstv-border);
    border-radius: 12px;
    cursor: pointer;
    background: var(--ytstv-surface);
    transition:
      background-color var(--ytstv-transition-duration) ease-in-out,
      border-color var(--ytstv-transition-duration) ease-in-out,
      box-shadow var(--ytstv-transition-duration) ease-in-out;

    &:not(.disabled):hover {
      background: var(--ytstv-surface-hover);
    }

    &.disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 2px solid var(--ytstv-accent);
      outline-offset: 2px;
    }

    .content {
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

    .actions {
      display: flex;
      align-items: center;
      color: var(--ytstv-muted);
    }
  }
</style>
