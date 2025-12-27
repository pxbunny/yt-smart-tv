<script lang="ts">
  import { onMount } from 'svelte';

  import Card from '~/components/ui/card.svelte';
  import Header from '~/components/ui/header.svelte';
  import Section from '~/components/ui/section.svelte';

  let options = $state<Options>({ ...emptyOptions });
  let hydrated = $state(false);
  let timeout: ReturnType<typeof setTimeout> | undefined;

  onMount(() => {
    (async () => {
      const stored = await getOptions();
      Object.assign(options, stored);
      hydrated = true;
    })();

    return () => clearTimeout(timeout);
  });

  $effect(() => {
    if (!hydrated) return;

    const snapshot: Options = { ...options };

    // debounce
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      await setOptions(snapshot);
    }, 200);
  });
</script>

<main>
  <Header subtitle="Options" />

  <Section title="Buttons">
    <Card
      type="switch"
      title="Sidebar button"
      description='Add a "Smart TV" entry in the left navigation menu.'
      bind:checked={options.showGuideButton}
      disabled={!hydrated}
    />

    <Card
      type="switch"
      title="Sidebar button (mini)"
      description='Add a "Smart TV" entry in the collapsed mini sidebar.'
      bind:checked={options.showMiniGuideButton}
      disabled={!hydrated}
    />

    <Card
      type="switch"
      title="Player button"
      description="Add a Smart TV button next to the fullscreen control on the player."
      bind:checked={options.showPlayerButton}
      disabled={!hydrated}
    />
  </Section>

  <Section title="Behavior">
    <Card
      type="switch"
      title="Open Smart TV in fullscreen"
      description="Open TV mode in a fullscreen window."
      bind:checked={options.openInFullscreen}
      disabled={!hydrated}
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

    @media (max-width: 680px) {
      padding: 40px 12px;
    }
  }
</style>
