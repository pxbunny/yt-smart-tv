declare module '*.json' {
    const value: any;
    export default value;
}

declare module '*.svelte' {
    import { ComponentType } from 'svelte';
    const component: ComponentType;
    export default component;
}
