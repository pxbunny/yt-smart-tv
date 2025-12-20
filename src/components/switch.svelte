<script lang="ts">
  type Props = {
    checked?: boolean;
    disabled?: boolean;
  };

  let { checked = $bindable(false), disabled = false }: Props = $props();
</script>

<span class="switch">
  <input type="checkbox" bind:checked {disabled} />
  <span class="track" aria-hidden="true">
    <span class="thumb"></span>
  </span>
</span>

<style lang="scss">
  .switch {
    display: inline-flex;
    align-items: center;
    cursor: inherit;
    user-select: none;

    input {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;

      &:checked + .track {
        background: var(--ytstv-accent, #3b82f6);

        .thumb {
          transform: translateX(14px);
        }
      }

      &:focus-visible + .track {
        outline: 2px solid var(--ytstv-accent, #3b82f6);
        outline-offset: 2px;
      }

      &:disabled + .track {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .track {
      width: 34px;
      height: 20px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.1);
      position: relative;
      transition: background-color 200ms ease-in-out;

      .thumb {
        width: 16px;
        height: 16px;
        border-radius: 999px;
        background: var(--ytstv-fg, #f1f1f1);
        position: absolute;
        top: 2px;
        left: 2px;
        transition: transform 200ms ease-in-out;
      }
    }
  }
</style>
