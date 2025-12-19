<script lang="ts">
  export let checked = false;
  export let disabled = false;
  export let ariaLabel: string | undefined = undefined;
</script>

<label class="switch">
  <input
    type="checkbox"
    bind:checked
    disabled={disabled}
    aria-label={ariaLabel}
  />
  <span class="track" aria-hidden="true">
    <span class="thumb"></span>
  </span>
</label>

<style lang="scss">
  .switch {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

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
  }

  .track {
    width: 40px;
    height: 22px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
    position: relative;
    transition: background-color 200ms ease;
  }

  .thumb {
    width: 18px;
    height: 18px;
    border-radius: 999px;
    background: #f1f1f1;
    position: absolute;
    top: 2px;
    left: 2px;
    transition: transform 120ms ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  input:checked + .track {
    background: #3b82f6;
  }

  input:checked + .track .thumb {
    transform: translateX(18px);
  }

  input:focus-visible + .track {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  input:disabled + .track {
    opacity: 0.5;
  }

  .switch:has(input:disabled) {
    cursor: not-allowed;
  }
</style>
