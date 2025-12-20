<script lang="ts">
  import Header from './components/header.svelte';
  import Option from './components/option.svelte';
  import Section from './components/section.svelte';

  let options = $state<Options>({ ...defaultOptions });
</script>

<main>
  <Header />

  <Section title="Buttons">
    <Option
      title="Sidebar button"
      description='Adds a "Smart TV" entry in the left navigation menu.'
      bind:checked={options.showGuideButton}
    />

    <Option
      title="Sidebar button (mini)"
      description='Adds the "Smart TV" entry in the collapsed mini sidebar.'
      bind:checked={options.showMiniGuideButton}
    />

    <Option
      title="Player button"
      description="Add a Smart TV button next to the fullscreen control on the player."
      bind:checked={options.showPlayerButton}
    />
  </Section>

  <Section title="Behavior">
    <Option
      title="Open Smart TV in fullscreen"
      description="Open TV mode in a new fullscreen window."
      bind:checked={options.openInFullscreen}
    />
  </Section>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 600px;
    margin: 0 auto;
    padding: 40px;

    @media (max-width: 640px) {
      padding: 40px 12px;
    }
  }
</style>
