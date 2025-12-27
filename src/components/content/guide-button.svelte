<script lang="ts">
  import { type Snippet } from 'svelte';

  type Props = {
    id?: string;
    mini?: boolean;
    onclick?: () => void;
    label?: string;
    children?: Snippet;
  };

  let { id, mini, onclick, label, children }: Props = $props();
</script>

<div
  id={id}
  class={mini ? 'smart-tv-mini-guide ytd-mini-guide-renderer' : 'container ytd-guide-section-renderer'}
>
  <button
    id="endpoint"
    class={`yt-simple-endpoint ${mini ? 'smart-tv-mini-button ytd-mini-guide-entry-renderer' : 'smart-tv-button ytd-guide-entry-renderer'}`}
    type="button"
    title={label}
    aria-label={label}
    {onclick}
  >
    <div
      class={`guide-icon ${mini ? 'ytd-mini-guide-entry-renderer' : 'ytd-guide-entry-renderer'}`}
    >
      <span class="yt-icon-shape yt-icon yt-spec-icon-shape">
        {@render children?.()}
      </span>
    </div>
    <span class={`title ${mini ? 'ytd-mini-guide-entry-renderer' : 'ytd-guide-entry-renderer'}`}>
      {label}
    </span>
  </button>
</div>

<style lang="scss">
  .smart-tv-mini-guide {
    border-radius: 10px;

    &:hover,
    &:focus {
      background-color: var(--yt-spec-badge-chip-background);
      outline: none;
    }

    .title {
      color: var(--yt-spec-text-primary);
    }
  }

  .container {
    width: calc(100% - 12px);
  }

  button {
    background: transparent;
    color: inherit;
    border: none;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    width: 100%;
  }

  .smart-tv-button {
    padding: 0 12px;

    .title {
      text-align: start;
    }
  }

  .smart-tv-mini-button {
    padding: 16px 0 14px;
    outline: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
