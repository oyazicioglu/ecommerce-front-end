<script context="module">
    export async function preload(page, session) {
        if (page.path !== '/user/login' && page.path !== '/user/register') {
            return this.redirect(302, '/user/login');
        }
    }
</script>

<script>
    import 'carbon-components-svelte/css/all.css';
    import { Theme } from 'carbon-components-svelte';
    export let segment;
    segment = '';

    let theme = 'g80';
</script>

<Theme bind:theme />
<main>
    <slot />
</main>

<style lang="scss" global>
    @import '../styles/main.scss';
</style>
