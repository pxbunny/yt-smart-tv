<script lang="ts">
  export let id: string | undefined = undefined;
  export let mini = false;
  export let onClick: (() => void) | undefined = undefined;
  export let label: string | undefined = undefined;
</script>

<div
  id={id}
  class={mini ? 'ytd-mini-guide-renderer' : 'yte-guide-entry-container ytd-guide-section-renderer'}
>
  <button
    id="endpoint"
    on:click={onClick}
    class={`yt-simple-endpoint ${mini ? 'yte-mini-guide-entry ytd-mini-guide-entry-renderer' : 'yte-guide-entry ytd-guide-entry-renderer'}`}
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
  .yte-guide-entry-container {
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

  .yte-guide-entry {
    padding: 0 12px;

    & .title {
      text-align: start;
    }
  }

  .yte-mini-guide-entry {
    padding: 16px 0 14px;
    outline: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
