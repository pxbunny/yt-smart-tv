<script lang="ts">
  import Option from './option.svelte';

  let options = $state<Options>({ ...defaultOptions });
</script>

<main>
  <section>
    <h1>Buttons</h1>
    <div class="grid">
      <Option
        title="Sidebar button"
        description="Add a “Smart TV” entry in the left navigation menu."
        bind:checked={options.showGuideButton}
      />

      <Option
        title="Sidebar button (mini)"
        description="Add the “Smart TV” entry in the collapsed mini sidebar."
        bind:checked={options.showMiniGuideButton}
      />

      <Option
        title="Player button"
        description="Add a Smart TV button next to the fullscreen control on the player."
        bind:checked={options.showPlayerButton}
      />
    </div>
  </section>

  <section>
    <h1>Behavior</h1>
    <div class="grid">
      <Option
        title="Open Smart TV in fullscreen"
        description="Open TV mode in a new fullscreen window."
        bind:checked={options.openInFullscreen}
      />
    </div>
  </section>
</main>

<style lang="scss">
  :global(:root) {
    color-scheme: dark;
  }

  :global(html) {
    font-size: 100%;
    box-sizing: border-box;
  }

  :global(body) {
    font: 14px/1.45 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
    color: #f1f1f1;
    background: #0f0f0f;
    margin: 0;
    padding: 0;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 18px;
    max-width: 760px;
    margin: 0 auto;
    padding: 18px 12px;
  }

  h1 {
    margin: 0 0 12px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #aaa;
  }

  .grid {
    display: grid;
    gap: 12px;
  }
</style>
