<script lang="ts">
  type Props = {
    width?: string | number | null;
    height?: string | number | null;
    color?: string | null;
  };

  let { width, height, color = 'currentColor' }: Props = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="96 168 832 666" {height} {width}>
  <rect x="128" y="200" width="768" height="520" rx="96" ry="96" stroke={color} stroke-width="64" />
  <polygon points="428.0,340.0 428.0,580.0 668.0,460" fill={color} />
  <line x1="224" y1="810" x2="800" y2="810" stroke={color} stroke-width="48" stroke-linecap="round" />
</svg>
