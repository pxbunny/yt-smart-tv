<script lang="ts">
  import Card from '~/components/ui/card.svelte';
  import Footer from '~/components/ui/footer.svelte';
  import Header from '~/components/ui/header.svelte';
  import Section from '~/components/ui/section.svelte';

  const handleYouTubeClick = async () => {
    await openYouTube();
    window.close();
  };

  const handleYouTubeTvClick = async () => {
    const options = await lazyOptions.get();
    const incognito = false;
    await openYouTubeTv('', options, incognito);
    window.close();
  };

  const handleOptionsClick = async () => {
    await openOptions();
    window.close();
  };

  const lazyOptions = new LazyOptions();
</script>

<main>
  <Header size="sm" />

  <Section>
    <Card
      type="button"
      title="Open YouTube"
      onclick={handleYouTubeClick}
      icon="external-link"
    />

    <Card
      type="button"
      title="Open YouTube TV"
      onclick={handleYouTubeTvClick}
      icon="external-link"
    />

    <Card
      type="button"
      title="Open extension options"
      onclick={handleOptionsClick}
      icon="settings"
    />
  </Section>

  <Footer />
</main>

<style lang="scss">
  main {
    min-width: 320px;
    padding: 16px 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
</style>
