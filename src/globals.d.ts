declare module '*.json' {
    const value: any;
    export default value;
}

declare module '*.svelte' {
    import { ComponentType, SvelteComponent } from 'svelte';
    const component: ComponentType<SvelteComponent<any>>;
    export default component;
}
