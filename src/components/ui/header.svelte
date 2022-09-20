<script>
    import {
        Header,
        HeaderUtilities,
        HeaderAction,
        HeaderGlobalAction,
        HeaderPanelLinks,
        HeaderPanelDivider,
        HeaderPanelLink,
        SideNav,
        SideNavItems,
        SideNavMenu,
        SideNavMenuItem,
        SideNavLink,
        SkipToContent,
        Content,
        Grid,
        Row,
        Column,
    } from 'carbon-components-svelte';
    import SettingsAdjust from 'carbon-icons-svelte/lib/SettingsAdjust.svelte';
    import UserAvatarFilledAlt from 'carbon-icons-svelte/lib/UserAvatarFilledAlt.svelte';
    import { stores, goto } from '@sapper/app';

    const { session } = stores();

    let isSideNavOpen = false;
    let isOpen1 = false;
    let isOpen2 = false;

    const logout = async () => {
        const result = await fetch('http://localhost:8080/api/user/logout', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ AccessToken: $session.User.AccessToken }),
        });

        const data = await result.json();

        $session = undefined;
        goto('/');
    };
</script>

<Header company="IBM" platformName="Carbon Svelte" bind:isSideNavOpen>
    <svelte:fragment slot="skip-to-content">
        <SkipToContent />
    </svelte:fragment>
    <HeaderUtilities>
        <HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust} />
        <HeaderAction bind:isOpen={isOpen1} icon={UserAvatarFilledAlt} closeIcon={UserAvatarFilledAlt}>
            <HeaderPanelLinks>
                <HeaderPanelDivider>{$session.User.Email}</HeaderPanelDivider>
                <HeaderPanelLink on:click={logout}>Logout</HeaderPanelLink>
            </HeaderPanelLinks>
        </HeaderAction>
        <HeaderAction bind:isOpen={isOpen2}>
            <HeaderPanelLinks>
                <HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
                <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
                <HeaderPanelDivider>Switcher subject 2</HeaderPanelDivider>
                <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
                <HeaderPanelLink>Switcher item 2</HeaderPanelLink>
                <HeaderPanelLink>Switcher item 3</HeaderPanelLink>
                <HeaderPanelLink>Switcher item 4</HeaderPanelLink>
                <HeaderPanelLink>Switcher item 5</HeaderPanelLink>
            </HeaderPanelLinks>
        </HeaderAction>
    </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
        <SideNavLink href="/" text="Link 1" />
        <SideNavMenu text="Menu">
            <SideNavMenuItem href="/" text="Link 1" />
        </SideNavMenu>
    </SideNavItems>
</SideNav>

<Content>
    <Grid>
        <Row>
            <Column>
                <slot />
            </Column>
        </Row>
    </Grid>
</Content>
