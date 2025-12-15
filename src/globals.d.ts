declare module '*.json' {
    const value: any;
    export default value;
}

declare module '*.svelte' {
    import type { Component } from 'svelte';
    const component: Component<any>;
    export default component;
}
