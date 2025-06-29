<script lang="ts">
  export let id: string | undefined = undefined;
  export let onClick: (() => void) | undefined = undefined;
</script>

<button id={id} on:click={onClick}>
  TV
</button>
