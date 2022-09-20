<script context="module">
    export async function preload(page, session) {
        const publicRoutes = ['/user/login', '/user/register'];
        if ((!session || !session.User) && publicRoutes.indexOf(page.path) === -1) {
            return this.redirect(302, '/user/login');
        }
    }
</script>

<script>
    import 'carbon-components-svelte/css/all.css';
    import { Theme } from 'carbon-components-svelte';
    import { stores, goto } from '@sapper/app';
    import PrivateLayout from '../components/page/private-layout.svelte';
    import PublicLayout from '../components/page/public-layout.svelte';
    import { onMount } from 'svelte';

    const { session } = stores();

    export let segment;
    segment = '';

    let theme = 'g80';

    onMount(async () => {
        if (!$session || !$session.User || !document) {
            goto('/user/login');
        }
    });
</script>

<Theme bind:theme />
<main>
    {#if $session.User}
        <PrivateLayout><slot /></PrivateLayout>
    {:else}
        <PublicLayout><slot /></PublicLayout>
    {/if}
</main>

<style lang="scss" global>
    @import '../styles/main.scss';
</style>
