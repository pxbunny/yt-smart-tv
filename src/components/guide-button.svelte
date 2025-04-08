<script lang="ts">
  export let id: string | undefined = undefined;
  export let mini = false;
  export let onClick: (() => void) | undefined = undefined;
  export let label: string | undefined = undefined;
</script>

<div
  id={id}
  class={mini ? 'ytd-mini-guide-renderer' : 'container ytd-guide-section-renderer'}
>
  <button
    id="endpoint"
    on:click={onClick}
    class={`yt-simple-endpoint ${mini ? 'smart-tv-mini-button ytd-mini-guide-entry-renderer' : 'smart-tv-button ytd-guide-entry-renderer'}`}
  >
    <div
      class={`guide-icon ${mini ? 'ytd-mini-guide-entry-renderer' : 'ytd-guide-entry-renderer'}`}
    >
      <span class="yt-icon-shape yt-icon yt-spec-icon-shape">
        <slot />
      </span>
    </div>
    <span class={`title ${mini ? 'ytd-mini-guide-entry-renderer' : 'ytd-guide-entry-renderer'}`}>
      {label}
    </span>
  </button>
</div>

<style>
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

    & .title {
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
