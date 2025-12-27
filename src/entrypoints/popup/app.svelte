<script lang="ts">
  import Card from '~/components/ui/card.svelte';
  import Header from '~/components/ui/header.svelte';
  import Section from '~/components/ui/section.svelte';

  const handleYouTubeClick = async () => {
    await browser.tabs.create({ url: 'https://www.youtube.com/' });
    window.close();
  };

  const handleYouTubeTvClick = async () => {
    await browser.tabs.create({ url: 'https://www.youtube.com/tv' });
    window.close();
  };

  const handleOptionsClick = async () => {
    await browser.runtime.openOptionsPage();
    window.close();
  };
</script>

<main>
  <Header />

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
</main>

<style lang="scss">
  main {
    min-width: 360px;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
</style>
